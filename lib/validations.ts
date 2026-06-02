import { z } from "zod";

// ============================================================
// 견적서 도메인 Zod 스키마
// ============================================================

// 견적서 상태 스키마
export const invoiceStatusSchema = z.enum(["active", "expired"]);

// 발급자 정보 스키마
export const issuerSchema = z.object({
  name: z.string(),
  contactPerson: z.string(),
  email: z.string(),
  phone: z.string(),
  businessNumber: z.string(),
  address: z.string(),
});

// 고객 정보 스키마
export const clientSchema = z.object({
  name: z.string(),
  contactPerson: z.string(),
  email: z.string(),
  phone: z.string(),
});

// 견적서 품목 스키마
export const invoiceItemSchema = z.object({
  id: z.string(),
  invoiceId: z.string(),
  name: z.string(),
  description: z.string().default(""),
  quantity: z.number().int().nonnegative(),
  unitPrice: z.number().nonnegative(),
  amount: z.number().nonnegative(),
  unit: z.string().default("개"),
});

// 견적서 전체 스키마
export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  issueDate: z.string(),
  validUntil: z.string(),
  status: invoiceStatusSchema,
  totalAmount: z.number().nonnegative(),
  taxAmount: z.number().nonnegative(),
  subtotal: z.number().nonnegative(),
  memo: z.string().default(""),
  issuer: issuerSchema,
  client: clientSchema,
  items: z.array(invoiceItemSchema),
});

// 견적서 목록 아이템 스키마
export const invoiceListItemSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  issueDate: z.string(),
  validUntil: z.string(),
  status: invoiceStatusSchema,
  totalAmount: z.number().nonnegative(),
  clientName: z.string(),
});

// 스키마 타입 추출 (types/index.ts와 일치하도록 유지)
export type InvoiceSchema = z.infer<typeof invoiceSchema>;
export type InvoiceItemSchema = z.infer<typeof invoiceItemSchema>;
export type InvoiceListItemSchema = z.infer<typeof invoiceListItemSchema>;

// ============================================================
// Notion API 응답 검증 스키마
// ============================================================

// Notion 텍스트 리치 타입 스키마
const notionRichTextSchema = z.array(
  z.object({
    plain_text: z.string(),
  })
);

// Notion 페이지 속성 스키마 (견적서 DB 기준)
export const notionInvoicePropertySchema = z.object({
  // 견적서 번호 (Title)
  title: z.object({
    title: notionRichTextSchema,
  }),
  // 발급일 (Date)
  issueDate: z.object({
    date: z.object({ start: z.string() }).nullable(),
  }),
  // 유효기간 (Date)
  validUntil: z.object({
    date: z.object({ start: z.string() }).nullable(),
  }),
  // 고객명 (Text)
  clientName: z.object({
    rich_text: notionRichTextSchema,
  }),
  // 고객 담당자 (Text)
  clientContactPerson: z.object({
    rich_text: notionRichTextSchema,
  }),
  // 고객 이메일 (Email)
  clientEmail: z.object({
    email: z.string().nullable(),
  }),
  // 고객 연락처 (Phone)
  clientPhone: z.object({
    phone_number: z.string().nullable(),
  }),
  // 발급자명 (Text)
  issuerName: z.object({
    rich_text: notionRichTextSchema,
  }),
  // 발급자 이메일 (Email)
  issuerEmail: z.object({
    email: z.string().nullable(),
  }),
  // 발급자 연락처 (Phone)
  issuerPhone: z.object({
    phone_number: z.string().nullable(),
  }),
  // 사업자번호 (Text)
  businessNumber: z.object({
    rich_text: notionRichTextSchema,
  }),
  // 발급자 주소 (Text)
  issuerAddress: z.object({
    rich_text: notionRichTextSchema,
  }),
  // 비고 (Rich Text)
  memo: z.object({
    rich_text: notionRichTextSchema,
  }),
});

// Notion 페이지 스키마
export const notionPageSchema = z.object({
  id: z.string(),
  properties: notionInvoicePropertySchema,
});

// Notion 테이블 블록 셀 스키마 (품목 테이블)
export const notionTableRowSchema = z.object({
  type: z.literal("table_row"),
  table_row: z.object({
    cells: z.array(z.array(z.object({ plain_text: z.string() }))),
  }),
});
