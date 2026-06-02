/**
 * 노션 API 응답 → 견적서 도메인 모델 매핑 모듈
 *
 * 노션의 원시 페이지 속성(Properties)과 블록(Blocks)을
 * 애플리케이션의 견적서 도메인 타입으로 변환합니다.
 */
import type { PageObjectResponse, BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Invoice, InvoiceItem, InvoiceListItem, Issuer, Client, InvoiceStatus } from "@/types";

// ============================================================
// 노션 속성 추출 헬퍼 함수
// ============================================================

/**
 * 노션 Title 속성에서 순수 텍스트를 추출합니다.
 */
function extractTitle(prop: { title: Array<{ plain_text: string }> }): string {
  return prop.title.map((t) => t.plain_text).join("") ?? "";
}

/**
 * 노션 Rich Text 속성에서 순수 텍스트를 추출합니다.
 */
function extractRichText(prop: { rich_text: Array<{ plain_text: string }> }): string {
  return prop.rich_text.map((t) => t.plain_text).join("") ?? "";
}

/**
 * 노션 Date 속성에서 시작일 문자열을 추출합니다.
 * 날짜가 없으면 빈 문자열을 반환합니다.
 */
function extractDate(prop: { date: { start: string } | null }): string {
  return prop.date?.start ?? "";
}

/**
 * 노션 Email 속성에서 이메일 주소를 추출합니다.
 */
function extractEmail(prop: { email: string | null }): string {
  return prop.email ?? "";
}

/**
 * 노션 Phone 속성에서 전화번호를 추출합니다.
 */
function extractPhone(prop: { phone_number: string | null }): string {
  return prop.phone_number ?? "";
}

/**
 * 유효기간 만료 여부를 확인하여 견적서 상태를 반환합니다.
 * 유효기간이 오늘 이전이면 'expired', 이후이면 'active'를 반환합니다.
 */
function resolveStatus(validUntil: string): InvoiceStatus {
  if (!validUntil) return "active";
  return new Date(validUntil) < new Date() ? "expired" : "active";
}

// ============================================================
// 노션 페이지 → 견적서 매핑 함수
// ============================================================

/**
 * 노션 페이지 응답 객체를 InvoiceListItem(목록용 경량 타입)으로 변환합니다.
 * 목록 페이지에서 페이지별 상세 조회 없이 빠른 렌더링을 위해 사용합니다.
 */
export function mapPageToInvoiceListItem(page: PageObjectResponse): InvoiceListItem {
  // 노션 속성을 타입 단언하여 접근 (실제 DB 스키마와 일치 필요)
  const props = page.properties as Record<string, unknown>;

  const issueDate = extractDate(props["발급일"] as { date: { start: string } | null });
  const validUntil = extractDate(props["유효기간"] as { date: { start: string } | null });

  return {
    id: page.id,
    invoiceNumber: extractTitle(props["제목"] as { title: Array<{ plain_text: string }> }),
    issueDate,
    validUntil,
    status: resolveStatus(validUntil),
    totalAmount: 0, // 목록에서는 품목 계산 생략 (상세 페이지에서 계산)
    clientName: extractRichText(props["고객명"] as { rich_text: Array<{ plain_text: string }> }),
  };
}

/**
 * 노션 페이지 응답과 테이블 블록 행 데이터를 결합하여
 * 완전한 Invoice 도메인 객체로 변환합니다.
 *
 * @param page - 노션 페이지 응답 객체
 * @param tableRows - 노션 테이블 블록의 행 목록 (품목 데이터)
 */
export function mapPageToInvoice(
  page: PageObjectResponse,
  tableRows: BlockObjectResponse[]
): Invoice {
  const props = page.properties as Record<string, unknown>;

  const issueDate = extractDate(props["발급일"] as { date: { start: string } | null });
  const validUntil = extractDate(props["유효기간"] as { date: { start: string } | null });

  // 발급자 정보 구성
  const issuer: Issuer = {
    name: extractRichText(props["발급자명"] as { rich_text: Array<{ plain_text: string }> }),
    contactPerson: "",
    email: extractEmail(props["발급자 이메일"] as { email: string | null }),
    phone: extractPhone(props["발급자 연락처"] as { phone_number: string | null }),
    businessNumber: extractRichText(props["사업자번호"] as { rich_text: Array<{ plain_text: string }> }),
    address: extractRichText(props["발급자 주소"] as { rich_text: Array<{ plain_text: string }> }),
  };

  // 고객 정보 구성
  const client: Client = {
    name: extractRichText(props["고객명"] as { rich_text: Array<{ plain_text: string }> }),
    contactPerson: extractRichText(props["고객 담당자"] as { rich_text: Array<{ plain_text: string }> }),
    email: extractEmail(props["고객 이메일"] as { email: string | null }),
    phone: extractPhone(props["고객 연락처"] as { phone_number: string | null }),
  };

  // 품목 목록 변환 (테이블 블록 첫 번째 행은 헤더이므로 건너뜀)
  const items: InvoiceItem[] = tableRows
    .filter((block) => block.type === "table_row")
    .slice(1) // 헤더 행 제거
    .map((block, index) => {
      const row = block as BlockObjectResponse & {
        table_row: { cells: Array<Array<{ plain_text: string }>> };
      };
      const cells = row.table_row.cells;

      // 테이블 열 순서: 품목명 | 수량 | 단가 | 단위 | 설명
      const name = cells[0]?.[0]?.plain_text ?? "";
      const quantity = Number(cells[1]?.[0]?.plain_text ?? 0);
      const unitPrice = Number(cells[2]?.[0]?.plain_text ?? 0);
      const unit = cells[3]?.[0]?.plain_text ?? "개";
      const description = cells[4]?.[0]?.plain_text ?? "";

      return {
        id: `${page.id}-item-${index}`,
        invoiceId: page.id,
        name,
        description,
        quantity,
        unitPrice,
        amount: quantity * unitPrice,
        unit,
      };
    });

  // 금액 계산
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = Math.round(subtotal * 0.1); // 부가세 10%
  const totalAmount = subtotal + taxAmount;

  return {
    id: page.id,
    invoiceNumber: extractTitle(props["제목"] as { title: Array<{ plain_text: string }> }),
    issueDate,
    validUntil,
    status: resolveStatus(validUntil),
    totalAmount,
    taxAmount,
    subtotal,
    memo: extractRichText(props["비고"] as { rich_text: Array<{ plain_text: string }> }),
    issuer,
    client,
    items,
  };
}
