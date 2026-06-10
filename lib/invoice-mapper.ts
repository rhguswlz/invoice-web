/**
 * 노션 API 응답 → 견적서 도메인 모델 매핑 모듈
 *
 * 노션의 원시 페이지 속성(Properties)을 애플리케이션의 견적서 도메인 타입으로 변환합니다.
 *
 * 실제 Notion DB 속성명 (CSV 기준):
 *   Invoices DB: 견적서 번호(Title), 발행일(Date), 상태(Select),
 *                유효기간(Date), 총금액(Number/Rollup), 클라이언트명명(Text)
 *   Items DB:    항목명(Title), 수량(Number), 단가(Number), 금액(Formula)
 */
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type {
  Invoice,
  InvoiceItem,
  InvoiceListItem,
  Issuer,
  Client,
  InvoiceStatus,
  NotionInvoiceStatus,
} from "@/types";

// ============================================================
// 노션 속성 추출 헬퍼 함수
// ============================================================

/**
 * 노션 Title 속성에서 순수 텍스트를 추출합니다.
 */
function extractTitle(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { title: Array<{ plain_text: string }> };
  return p.title?.map((t) => t.plain_text).join("") ?? "";
}

/**
 * 노션 Rich Text 속성에서 순수 텍스트를 추출합니다.
 */
function extractRichText(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { rich_text: Array<{ plain_text: string }> };
  return p.rich_text?.map((t) => t.plain_text).join("") ?? "";
}

/**
 * 노션 Date 속성에서 시작일 문자열을 추출합니다.
 * 속성이 없거나 날짜가 없으면 빈 문자열을 반환합니다.
 */
function extractDate(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { date: { start: string } | null };
  return p.date?.start ?? "";
}

/**
 * 노션 Email 속성에서 이메일 주소를 추출합니다.
 */
function extractEmail(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { email: string | null };
  return p.email ?? "";
}

/**
 * 노션 Phone 속성에서 전화번호를 추출합니다.
 */
function extractPhone(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { phone_number: string | null };
  return p.phone_number ?? "";
}

/**
 * 노션 Select 또는 Status 속성에서 선택된 옵션 이름을 추출합니다.
 * 노션에는 select와 status 두 가지 단일 선택 타입이 있으며,
 * 실제 '상태' 속성은 status 타입이므로 두 경우를 모두 처리합니다.
 * 선택값이 없으면 null을 반환합니다.
 */
function extractSelect(prop: unknown): string | null {
  if (!prop || typeof prop !== "object") return null;
  // Status 타입: { status: { name } }
  const asStatus = prop as { status?: { name: string } | null };
  if (asStatus.status) return asStatus.status.name ?? null;
  // Select 타입: { select: { name } }
  const asSelect = prop as { select?: { name: string } | null };
  return asSelect.select?.name ?? null;
}

/**
 * 노션 Number 또는 Rollup(숫자) 속성에서 값을 추출합니다.
 * 값이 없으면 0을 반환합니다.
 */
function extractNumber(prop: unknown): number {
  if (!prop || typeof prop !== "object") return 0;
  // Number 타입
  const asNum = prop as { number?: number | null };
  if (typeof asNum.number === "number") return asNum.number;
  // Rollup 타입 (number 결과)
  const asRollup = prop as { rollup?: { number?: number | null } };
  return asRollup.rollup?.number ?? 0;
}

/**
 * 노션 '상태' Select 값과 유효기간을 결합하여 앱 내부 상태를 결정합니다.
 *
 * 우선순위:
 *   1. 유효기간이 지났으면 → "expired" (노션 상태 무관)
 *   2. 노션 "완료" → "completed"
 *   3. 노션 "취소" → "cancelled"
 *   4. 노션 "대기" → "pending"
 *   5. 그 외 → "active"
 */
function resolveStatus(
  notionStatus: string | null,
  validUntil: string
): InvoiceStatus {
  // 유효기간 만료 여부를 최우선 판단
  if (validUntil && new Date(validUntil) < new Date()) return "expired";

  switch (notionStatus) {
    case "완료":
      return "completed";
    case "취소":
      return "cancelled";
    case "대기":
      return "pending";
    default:
      return "active";
  }
}

// ============================================================
// 노션 페이지 → 견적서 매핑 함수
// ============================================================

/**
 * 노션 페이지 응답 객체를 InvoiceListItem(목록용 경량 타입)으로 변환합니다.
 *
 * 실제 Invoices DB 속성명 사용:
 *   - 견적서 번호 (Title)
 *   - 발행일 (Date)
 *   - 상태 (Select)
 *   - 유효기간 (Date)
 *   - 총금액 (Number/Rollup)
 *   - 클라이언트명명 (Rich Text, 실제 DB 오타 그대로)
 */
export function mapPageToInvoiceListItem(page: PageObjectResponse): InvoiceListItem {
  const props = page.properties as Record<string, unknown>;

  const issueDate = extractDate(props["발행일"]);
  const validUntil = extractDate(props["유효기간"]);
  const rawStatus = extractSelect(props["상태"]) as NotionInvoiceStatus | null;

  return {
    id: page.id,
    invoiceNumber: extractTitle(props["견적서 번호"]),
    issueDate,
    validUntil,
    status: resolveStatus(rawStatus, validUntil),
    notionStatus: rawStatus,
    // 총금액은 Notion DB의 Rollup/Number 값 직접 사용 (Items 별도 조회 불필요)
    totalAmount: extractNumber(props["총금액"]),
    clientName: extractRichText(props["클라이언트명명"]),
  };
}

/**
 * Items DB 페이지 응답을 InvoiceItem으로 변환합니다.
 *
 * Items DB 속성명:
 *   - 항목명 (Title)
 *   - 수량 (Number)
 *   - 단가 (Number)
 *   - 금액 (Formula — 없으면 수량 × 단가로 계산)
 */
export function mapItemPageToInvoiceItem(
  itemPage: PageObjectResponse,
  invoiceId: string
): InvoiceItem {
  const props = itemPage.properties as Record<string, unknown>;

  const quantity = extractNumber(props["수량"]);
  const unitPrice = extractNumber(props["단가"]);
  // 금액(Formula)이 있으면 그대로 사용, 없으면 클라이언트 계산
  const formulaAmount = extractNumber(props["금액"]);
  const amount = formulaAmount > 0 ? formulaAmount : quantity * unitPrice;

  return {
    id: itemPage.id,
    invoiceId,
    name: extractTitle(props["항목명"]),
    quantity,
    unitPrice,
    amount,
  };
}

/**
 * 노션 Invoices DB 페이지와 Items DB 페이지 목록을 결합하여
 * 완전한 Invoice 도메인 객체로 변환합니다.
 *
 * @param page      - Invoices DB 노션 페이지 응답
 * @param itemPages - Items DB에서 조회한 품목 페이지 목록
 */
export function mapPageToInvoice(
  page: PageObjectResponse,
  itemPages: PageObjectResponse[]
): Invoice {
  const props = page.properties as Record<string, unknown>;

  const issueDate = extractDate(props["발행일"]);
  const validUntil = extractDate(props["유효기간"]);
  const rawStatus = extractSelect(props["상태"]) as NotionInvoiceStatus | null;

  // 발급자 정보 — 현재 Invoices DB에 발급자 속성이 없으므로 빈 문자열로 초기화
  // 향후 Notion DB에 발급자 속성 추가 또는 환경변수/설정으로 주입 가능
  const issuer: Issuer = {
    name: extractRichText(props["발급자명"]),
    contactPerson: extractRichText(props["발급자 담당자"]),
    email: extractEmail(props["발급자 이메일"]),
    phone: extractPhone(props["발급자 연락처"]),
    businessNumber: extractRichText(props["사업자번호"]),
    address: extractRichText(props["발급자 주소"]),
  };

  // 고객 정보
  const client: Client = {
    name: extractRichText(props["클라이언트명명"]),
    contactPerson: extractRichText(props["고객 담당자"]),
    email: extractEmail(props["고객 이메일"]),
    phone: extractPhone(props["고객 연락처"]),
  };

  // Items DB 페이지 → 품목 목록 변환
  const items: InvoiceItem[] = itemPages.map((itemPage) =>
    mapItemPageToInvoiceItem(itemPage, page.id)
  );

  // 금액 계산: Items 기반 합산
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = Math.round(subtotal * 0.1); // 부가세 10%
  const totalAmount = subtotal + taxAmount;

  return {
    id: page.id,
    invoiceNumber: extractTitle(props["견적서 번호"]),
    issueDate,
    validUntil,
    status: resolveStatus(rawStatus, validUntil),
    notionStatus: rawStatus,
    totalAmount,
    taxAmount,
    subtotal,
    memo: extractRichText(props["비고"]),
    issuer,
    client,
    items,
  };
}
