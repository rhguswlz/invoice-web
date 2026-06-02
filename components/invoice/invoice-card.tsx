/**
 * 견적서 목록 카드 컴포넌트
 * 견적서 목록 페이지에서 각 견적서를 카드 형태로 표시합니다.
 */
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InvoiceListItem } from "@/types";

interface InvoiceCardProps {
  /** 목록 아이템 견적서 데이터 */
  invoice: InvoiceListItem;
}

/**
 * 금액을 한국 원화 형식으로 포맷합니다.
 */
function formatKRW(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}

/**
 * 날짜 문자열을 한국어 형식(yyyy년 MM월 dd일)으로 포맷합니다.
 */
function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  const isExpired = invoice.status === "expired";

  return (
    <Card
      className={cn(
        "transition-shadow hover:shadow-md",
        isExpired && "opacity-70"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold">
            {invoice.invoiceNumber}
          </CardTitle>
          {/* 견적서 상태 배지: 만료 여부에 따라 색상 구분 */}
          <Badge variant={isExpired ? "secondary" : "default"}>
            {isExpired ? "만료됨" : "유효"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* 고객명 */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{invoice.clientName || "-"}</span>
        </div>

        {/* 발급일 / 유효기간 */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>
            {formatDate(invoice.issueDate)} ~ {formatDate(invoice.validUntil)}
          </span>
        </div>

        {/* 금액 및 뷰어 이동 버튼 */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-bold">
            {invoice.totalAmount > 0 ? formatKRW(invoice.totalAmount) : "-"}
          </span>
          <Button asChild size="sm" variant="outline">
            <Link href={`/invoices/${invoice.id}`}>
              견적서 보기 <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
