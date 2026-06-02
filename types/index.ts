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

// 견적서 상태 타입
export type InvoiceStatus = "active" | "expired";

// 발급자 정보 타입
export type Issuer = {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessNumber: string;
  address: string;
};

// 고객 정보 타입
export type Client = {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
};

// 견적서 품목 타입
export type InvoiceItem = {
  id: string;
  invoiceId: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  unit: string;
};

// 견적서 전체 타입
export type Invoice = {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  validUntil: string;
  status: InvoiceStatus;
  totalAmount: number;
  taxAmount: number;
  subtotal: number;
  memo: string;
  issuer: Issuer;
  client: Client;
  items: InvoiceItem[];
};

// 견적서 목록 아이템 타입 (목록 페이지용 경량 타입)
export type InvoiceListItem = Pick<
  Invoice,
  | "id"
  | "invoiceNumber"
  | "issueDate"
  | "validUntil"
  | "status"
  | "totalAmount"
> & {
  clientName: string;
};

// API 응답 래퍼 타입
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
