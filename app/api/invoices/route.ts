/**
 * 견적서 목록 조회 API 라우트
 * GET /api/invoices
 *
 * 노션 데이터베이스에서 전체 견적서 목록을 조회하여 반환합니다.
 * 노션 토큰 보호를 위해 서버 사이드에서만 실행됩니다.
 */
import { NextResponse } from "next/server";
import { APIErrorCode, isNotionClientError } from "@notionhq/client";
import { notion, NOTION_DATABASE_ID } from "@/lib/notion";
import { mapPageToInvoiceListItem } from "@/lib/invoice-mapper";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { ApiResponse, InvoiceListItem } from "@/types";

export async function GET(): Promise<NextResponse<ApiResponse<InvoiceListItem[]>>> {
  try {
    // 노션 데이터베이스에서 전체 페이지(견적서) 목록 조회
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      sorts: [
        {
          // 발행일 내림차순 정렬 (최신 견적서가 먼저 표시)
          property: "발행일",
          direction: "descending",
        },
      ],
    });

    // 노션 페이지 응답을 견적서 목록 아이템으로 변환
    const invoices: InvoiceListItem[] = response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map(mapPageToInvoiceListItem);

    return NextResponse.json({ success: true, data: invoices });
  } catch (error) {
    // 노션 API 토큰이 유효하지 않은 경우 (401 Unauthorized)
    if (isNotionClientError(error) && error.code === APIErrorCode.Unauthorized) {
      console.error("노션 API 인증 오류:", error);
      return NextResponse.json(
        { success: false, error: "서비스 인증에 문제가 있습니다. 관리자에게 문의해 주세요." },
        { status: 401 }
      );
    }

    console.error("견적서 목록 조회 오류:", error);
    return NextResponse.json(
      { success: false, error: "견적서 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
