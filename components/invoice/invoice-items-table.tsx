/**
 * 견적서 품목 테이블 컴포넌트
 * 품목명, 수량, 단가, 금액을 표 형태로 렌더링합니다.
 */
import type { InvoiceItem } from "@/types";

interface InvoiceItemsTableProps {
  /** 견적서 품목 배열 */
  items: InvoiceItem[];
}

/**
 * 숫자를 한국 원화 형식으로 포맷합니다. (기호 없이 숫자만)
 */
function formatNumber(value: number): string {
  return new Intl.NumberFormat("ko-KR").format(value);
}

export function InvoiceItemsTable({ items }: InvoiceItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border py-8 text-center text-sm text-muted-foreground">
        등록된 품목이 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-medium">품목명</th>
            <th className="px-4 py-3 text-right font-medium">수량</th>
            <th className="px-4 py-3 text-right font-medium">단가</th>
            <th className="px-4 py-3 text-right font-medium">금액</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-muted/30">
              <td className="px-4 py-3">
                <p className="font-medium">{item.name}</p>
                {/* 품목 상세 설명이 있을 때만 표시 */}
                {item.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                {formatNumber(item.quantity)} {item.unit}
              </td>
              <td className="px-4 py-3 text-right">
                {formatNumber(item.unitPrice)}원
              </td>
              <td className="px-4 py-3 text-right font-medium">
                {formatNumber(item.amount)}원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
