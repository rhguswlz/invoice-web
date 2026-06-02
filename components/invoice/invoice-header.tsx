/**
 * 견적서 헤더 컴포넌트
 * 견적서 번호, 발급일, 유효기간, 발급자/고객 정보를 상단에 표시합니다.
 */
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import type { Invoice } from "@/types";

interface InvoiceHeaderProps {
  /** 견적서 전체 데이터 */
  invoice: Invoice;
}

/**
 * 날짜 문자열을 한국어 형식으로 포맷합니다.
 */
function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function InvoiceHeader({ invoice }: InvoiceHeaderProps) {
  const isExpired = invoice.status === "expired";

  return (
    <div className="space-y-6">
      {/* 만료 배너: 견적서가 유효기간 이후인 경우에만 표시 */}
      {isExpired && (
        <div className="rounded-lg bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
          ⚠ 이 견적서의 유효기간이 만료되었습니다.
        </div>
      )}

      {/* 견적서 번호 및 상태 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">견적서 번호</p>
          <h1 className="text-2xl font-bold">{invoice.invoiceNumber}</h1>
        </div>
        <Badge variant={isExpired ? "secondary" : "default"} className="text-sm">
          {isExpired ? "만료됨" : "유효"}
        </Badge>
      </div>

      {/* 발급일 / 유효기간 */}
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">발급일</p>
            <p className="text-sm font-medium">{formatDate(invoice.issueDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">유효기간</p>
            <p className="text-sm font-medium">{formatDate(invoice.validUntil)}</p>
          </div>
        </div>
      </div>

      {/* 발급자 / 고객 정보 2단 레이아웃 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* 발급자 정보 */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            발급자
          </p>
          <p className="font-semibold">{invoice.issuer.name || "-"}</p>
          {invoice.issuer.businessNumber && (
            <p className="text-sm text-muted-foreground">
              사업자번호: {invoice.issuer.businessNumber}
            </p>
          )}
          {invoice.issuer.email && (
            <p className="text-sm text-muted-foreground">{invoice.issuer.email}</p>
          )}
          {invoice.issuer.phone && (
            <p className="text-sm text-muted-foreground">{invoice.issuer.phone}</p>
          )}
          {invoice.issuer.address && (
            <p className="text-sm text-muted-foreground">{invoice.issuer.address}</p>
          )}
        </div>

        {/* 고객 정보 */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            수신
          </p>
          <p className="font-semibold">{invoice.client.name || "-"}</p>
          {invoice.client.contactPerson && (
            <p className="text-sm text-muted-foreground">
              담당자: {invoice.client.contactPerson}
            </p>
          )}
          {invoice.client.email && (
            <p className="text-sm text-muted-foreground">{invoice.client.email}</p>
          )}
          {invoice.client.phone && (
            <p className="text-sm text-muted-foreground">{invoice.client.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}
