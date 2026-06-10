/**
 * 견적서 단건 조회 API 라우트
 * GET /api/invoices/[id]
 *
 * 노션 페이지 ID를 기반으로 특정 견적서 데이터를 조회합니다.
 * 견적서 페이지 속성과 별도 Items DB의 연결된 품목을 함께 가져와
 * 완전한 견적서를 구성합니다.
 */
import { NextResponse } from "next/server";
import { APIErrorCode, isNotionClientError } from "@notionhq/client";
import { notion, NOTION_ITEMS_DATABASE_ID } from "@/lib/notion";
import { mapPageToInvoice } from "@/lib/invoice-mapper";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { ApiResponse, Invoice } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<Invoice>>> {
  const { id } = await params;

  try {
    // 견적서 페이지 속성 조회
    const page = await notion.pages.retrieve({ page_id: id });

    if (!("properties" in page)) {
      return NextResponse.json(
        { success: false, error: "견적서를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // Items DB에서 현재 견적서와 연결된 품목 조회
    // 'Invoices' Relation 속성이 현재 견적서 페이지 ID를 포함하는 항목만 필터링
    const itemsResponse = await notion.databases.query({
      database_id: NOTION_ITEMS_DATABASE_ID,
      filter: {
        property: "Invoices",
        relation: {
          contains: id,
        },
      },
    });

    const itemPages = itemsResponse.results.filter(
      (item): item is PageObjectResponse => "properties" in item
    );

    // 견적서 속성 + Items DB 품목을 결합하여 견적서 도메인 객체 생성
    const invoice = mapPageToInvoice(page as PageObjectResponse, itemPages);

    return NextResponse.json({ success: true, data: invoice });
  } catch (error: unknown) {
    // 노션 API 토큰이 유효하지 않은 경우 (401 Unauthorized)
    if (isNotionClientError(error) && error.code === APIErrorCode.Unauthorized) {
      console.error("노션 API 인증 오류:", error);
      return NextResponse.json(
        { success: false, error: "서비스 인증에 문제가 있습니다. 관리자에게 문의해 주세요." },
        { status: 401 }
      );
    }

    // 존재하지 않는 페이지 ID 접근 시 노션에서 404 오류 반환
    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      (error as { status: number }).status === 404
    ) {
      return NextResponse.json(
        { success: false, error: "존재하지 않는 견적서입니다." },
        { status: 404 }
      );
    }

    console.error("견적서 조회 오류:", error);
    return NextResponse.json(
      { success: false, error: "견적서를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
