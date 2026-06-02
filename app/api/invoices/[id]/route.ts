/**
 * 견적서 단건 조회 API 라우트
 * GET /api/invoices/[id]
 *
 * 노션 페이지 ID를 기반으로 특정 견적서 데이터를 조회합니다.
 * 페이지 속성과 테이블 블록(품목 목록)을 함께 가져와 완전한 견적서를 구성합니다.
 */
import { NextResponse } from "next/server";
import { notion } from "@/lib/notion";
import { mapPageToInvoice } from "@/lib/invoice-mapper";
import type { PageObjectResponse, BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
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
    // 노션 페이지 속성 조회
    const page = await notion.pages.retrieve({ page_id: id });

    if (!("properties" in page)) {
      return NextResponse.json(
        { success: false, error: "견적서를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 페이지 본문 블록 목록 조회 (품목 테이블 블록 포함)
    const blocksResponse = await notion.blocks.children.list({
      block_id: id,
    });

    const tableRows = blocksResponse.results as BlockObjectResponse[];

    // 페이지 속성 + 테이블 블록을 결합하여 견적서 도메인 객체 생성
    const invoice = mapPageToInvoice(page as PageObjectResponse, tableRows);

    return NextResponse.json({ success: true, data: invoice });
  } catch (error: unknown) {
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
