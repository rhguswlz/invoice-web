import { z } from "zod";

// ============================================================
// 견적서 도메인 Zod 스키마
// ============================================================

/**
 * 노션 DB '상태' Select 원시값 스키마
 * 실제 Notion 데이터베이스의 Select 옵션 값과 정확히 일치해야 합니다.
 */
export const notionInvoiceStatusSchema = z.enum(["대기", "완료", "취소"]);

/**
 * 앱 내부 견적서 상태 스키마
 * types/index.ts의 InvoiceStatus와 동기화하여 유지합니다.
 */
export const invoiceStatusSchema = z.enum([
  "pending",
  "active",
  "expired",
  "completed",
  "cancelled",
]);

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

/**
 * 견적서 품목 스키마
 * Notion Items DB 실제 속성: 항목명, 수량, 단가, 금액
 * unit과 description은 DB에 없는 선택적 필드입니다.
 */
export const invoiceItemSchema = z.object({
  id: z.string(),
  invoiceId: z.string(),
  name: z.string(),
  quantity: z.number().int().nonnegative(),
  unitPrice: z.number().nonnegative(),
  amount: z.number().nonnegative(),
  unit: z.string().optional(),
  description: z.string().optional(),
});

// 견적서 전체 스키마
export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  issueDate: z.string(),
  validUntil: z.string(),
  status: invoiceStatusSchema,
  notionStatus: notionInvoiceStatusSchema.nullable(),
  totalAmount: z.number().nonnegative(),
  taxAmount: z.number().nonnegative(),
  subtotal: z.number().nonnegative(),
  memo: z.string().default(""),
  issuer: issuerSchema,
  client: clientSchema,
  items: z.array(invoiceItemSchema),
});

/**
 * 견적서 목록 아이템 스키마
 * totalAmount는 Notion DB의 '총금액' Rollup 값을 직접 사용합니다.
 */
export const invoiceListItemSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  issueDate: z.string(),
  validUntil: z.string(),
  status: invoiceStatusSchema,
  notionStatus: notionInvoiceStatusSchema.nullable(),
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

/**
 * Notion Invoices DB 속성 스키마
 * 실제 DB CSV 기반으로 정의된 속성명과 타입:
 *   - 견적서 번호 (Title)
 *   - 발행일 (Date)
 *   - 상태 (Select)
 *   - 유효기간 (Date)
 *   - 총금액 (Number/Rollup)
 *   - 클라이언트명명 (Rich Text) — DB 속성명 오타 포함
 *   - 항목 (Relation → Items DB)
 */
export const notionInvoicePropertySchema = z.object({
  // 견적서 번호 (Title)
  "견적서 번호": z.object({
    title: notionRichTextSchema,
  }),
  // 발행일 (Date)
  발행일: z.object({
    date: z.object({ start: z.string() }).nullable(),
  }),
  // 상태 (Select) — 선택적: 설정되지 않을 수 있음
  상태: z
    .object({
      select: z
        .object({
          name: z.string(),
        })
        .nullable(),
    })
    .optional(),
  // 유효기간 (Date)
  유효기간: z.object({
    date: z.object({ start: z.string() }).nullable(),
  }),
  // 총금액 (Number 또는 Rollup) — 선택적: Rollup 미설정 환경 대비
  총금액: z
    .object({
      number: z.number().nullable(),
    })
    .optional(),
  // 클라이언트명명 (Rich Text) — 실제 DB 속성명 오타 그대로 사용
  클라이언트명명: z
    .object({
      rich_text: notionRichTextSchema,
    })
    .optional(),
});

/**
 * Notion Items DB 속성 스키마
 * 실제 DB CSV 기반으로 정의된 속성명과 타입:
 *   - 항목명 (Title)
 *   - 수량 (Number)
 *   - 단가 (Number)
 *   - 금액 (Formula / Number)
 *   - Invoices (Relation)
 */
export const notionItemPropertySchema = z.object({
  // 항목명 (Title)
  항목명: z.object({
    title: notionRichTextSchema,
  }),
  // 수량 (Number)
  수량: z.object({
    number: z.number().nullable(),
  }),
  // 단가 (Number)
  단가: z.object({
    number: z.number().nullable(),
  }),
  // 금액 (Formula: 수량 × 단가) — 선택적, 없으면 클라이언트에서 계산
  금액: z
    .object({
      number: z.number().nullable(),
    })
    .optional(),
});

// Notion 페이지 스키마 (Invoices DB)
export const notionPageSchema = z.object({
  id: z.string(),
  properties: notionInvoicePropertySchema,
});

// Notion 테이블 블록 셀 스키마 (레거시 — 현재 미사용, 삭제 예정)
// 현재 구조: Items는 별도 DB로 관리 (위 notionItemPropertySchema 참조)
export const notionTableRowSchema = z.object({
  type: z.literal("table_row"),
  table_row: z.object({
    cells: z.array(z.array(z.object({ plain_text: z.string() }))),
  }),
});
