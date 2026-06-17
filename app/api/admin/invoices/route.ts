import { NextResponse } from "next/server";
import { APIErrorCode, isNotionClientError } from "@notionhq/client";
import { notion, NOTION_DATABASE_ID } from "@/lib/notion";
import { mapPageToInvoiceListItem } from "@/lib/invoice-mapper";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { ApiResponse, InvoiceListItem } from "@/types";

export async function GET(): Promise<NextResponse<ApiResponse<InvoiceListItem[]>>> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      sorts: [
        {
          property: "발행일",
          direction: "descending",
        },
      ],
    });

    const invoices: InvoiceListItem[] = response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map(mapPageToInvoiceListItem);

    return NextResponse.json({ success: true, data: invoices });
  } catch (error) {
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
