/**
 * 견적서 합계 섹션 컴포넌트
 * 공급가액, 부가세(10%), 최종 합계 금액을 표시합니다.
 */
import { Separator } from "@/components/ui/separator";
import type { Invoice } from "@/types";

interface InvoiceSummaryProps {
  /** 합계 금액 데이터가 포함된 견적서 */
  invoice: Pick<Invoice, "subtotal" | "taxAmount" | "totalAmount" | "memo">;
}

/**
 * 숫자를 한국 원화 기호와 함께 포맷합니다.
 */
function formatKRW(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}

export function InvoiceSummary({ invoice }: InvoiceSummaryProps) {
  return (
    <div className="space-y-4">
      {/* 금액 합계 테이블: 우측 정렬로 시각적 구분 */}
      <div className="ml-auto w-full max-w-xs space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">공급가액</span>
          <span>{formatKRW(invoice.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">부가세 (10%)</span>
          <span>{formatKRW(invoice.taxAmount)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>합계 금액</span>
          <span className="text-lg">{formatKRW(invoice.totalAmount)}</span>
        </div>
      </div>

      {/* 비고/메모: 내용이 있을 때만 렌더링 */}
      {invoice.memo && (
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="mb-1 text-xs font-semibold text-muted-foreground">비고</p>
          <p className="whitespace-pre-wrap text-sm">{invoice.memo}</p>
        </div>
      )}
    </div>
  );
}
