// ============================================================
// 공통 유틸리티 타입
// ============================================================

// 네비게이션 항목 타입
export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

// 사이트 설정 타입
export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  githubUrl: string;
};

// ============================================================
// 견적서 도메인 타입
// ============================================================

/**
 * 노션 DB '상태' Select 필드의 원시 한국어 값
 * 실제 Notion 데이터베이스의 Select 옵션 값과 정확히 일치해야 합니다.
 *
 * - "대기": 클라이언트의 응답을 기다리는 중
 * - "완료": 견적서가 승인/완료됨
 * - "취소": 견적서가 취소됨
 */
export type NotionInvoiceStatus = "대기" | "완료" | "취소";

/**
 * 앱 내부 견적서 상태 (UI 표현용)
 * Notion '상태' 값과 유효기간 날짜를 결합하여 계산됩니다.
 *
 * - "pending":   대기 중 (노션 "대기" + 유효기간 내)
 * - "active":    유효 (노션 상태 알 수 없음 + 유효기간 내)
 * - "expired":   만료됨 (유효기간 초과, 노션 상태 무관)
 * - "completed": 완료됨 (노션 "완료")
 * - "cancelled": 취소됨 (노션 "취소")
 */
export type InvoiceStatus = "pending" | "active" | "expired" | "completed" | "cancelled";

/**
 * 발급자 정보 타입
 * 현재 Notion DB 스키마에는 발급자 필드가 포함되어 있지 않습니다.
 * 향후 Notion DB에 발급자 속성 추가 또는 환경변수/설정 파일을 통해 제공할 수 있습니다.
 */
export type Issuer = {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessNumber: string;
  address: string;
};

/**
 * 고객 정보 타입
 * Notion DB 속성: '클라이언트명명' (이름), 향후 추가 속성 확장 가능
 */
export type Client = {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
};

/**
 * 견적서 품목 타입
 * Notion Items DB 스키마: 항목명(Title), 수량(Number), 단가(Number), 금액(Formula)
 *
 * @property id         - Notion Items DB 페이지 ID
 * @property invoiceId  - 연결된 견적서 페이지 ID (Relation)
 * @property name       - 항목명 (Items DB Title)
 * @property quantity   - 수량
 * @property unitPrice  - 단가 (원)
 * @property amount     - 금액 = 수량 × 단가 (원)
 * @property unit       - 단위 (Items DB에 없음, 선택적)
 * @property description - 설명 (Items DB에 없음, 선택적)
 */
export type InvoiceItem = {
  id: string;
  invoiceId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  unit?: string;
  description?: string;
};

/**
 * 견적서 전체 타입
 * Notion Invoices DB 속성 + Items DB 관계 데이터를 결합한 완전한 도메인 모델
 *
 * @property id            - Notion 페이지 ID
 * @property invoiceNumber - 견적서 번호 (Notion Title 속성 '견적서 번호')
 * @property issueDate     - 발행일 (Notion Date 속성 '발행일')
 * @property validUntil    - 유효기간 (Notion Date 속성 '유효기간')
 * @property status        - 앱 내부 상태 (NotionInvoiceStatus + 날짜 기반 계산)
 * @property notionStatus  - Notion 원시 상태값 (Select '상태')
 * @property totalAmount   - 총금액 (Notion Number/Rollup '총금액')
 * @property taxAmount     - 부가세 (총금액 기반 계산 또는 별도 필드)
 * @property subtotal      - 공급가액 = 총금액 - 부가세
 * @property memo          - 비고
 * @property issuer        - 발급자 정보
 * @property client        - 고객 정보
 * @property items         - 품목 목록 (Items DB 조회)
 */
export type Invoice = {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  validUntil: string;
  status: InvoiceStatus;
  notionStatus: NotionInvoiceStatus | null;
  totalAmount: number;
  taxAmount: number;
  subtotal: number;
  memo: string;
  issuer: Issuer;
  client: Client;
  items: InvoiceItem[];
};

/**
 * 견적서 목록 아이템 타입 (목록 페이지용 경량 타입)
 * Notion Invoices DB 속성만 사용하며, Items DB 조회를 생략합니다.
 * `totalAmount`는 Notion DB의 '총금액' Rollup 값을 직접 사용합니다.
 */
export type InvoiceListItem = Pick<
  Invoice,
  | "id"
  | "invoiceNumber"
  | "issueDate"
  | "validUntil"
  | "status"
  | "notionStatus"
  | "totalAmount"
> & {
  clientName: string;
};

// API 응답 래퍼 타입
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
