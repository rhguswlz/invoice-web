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
import type { InvoiceListItem, InvoiceStatus } from "@/types";

interface InvoiceCardProps {
  /** 목록 아이템 견적서 데이터 */
  invoice: InvoiceListItem;
}

/** 상태별 배지 설정 타입 */
interface StatusBadgeConfig {
  /** shadcn Badge variant */
  variant: "default" | "secondary" | "destructive" | "outline";
  /** 배지에 표시할 한국어 라벨 */
  label: string;
  /** 배지 커스텀 클래스 (완료 상태의 초록색 등) */
  badgeClassName?: string;
  /** 카드 전체에 적용할 클래스 (만료/취소 시 흐림 처리) */
  cardClassName?: string;
}

/**
 * 견적서 상태에 따른 배지 및 카드 스타일 설정을 반환합니다.
 */
function getStatusBadge(status: InvoiceStatus): StatusBadgeConfig {
  switch (status) {
    case "pending":
      return { variant: "outline", label: "대기 중" };
    case "active":
      return { variant: "default", label: "유효" };
    case "expired":
      return { variant: "secondary", label: "만료됨", cardClassName: "opacity-70" };
    case "completed":
      return {
        variant: "default",
        label: "완료",
        badgeClassName:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0",
      };
    case "cancelled":
      return { variant: "destructive", label: "취소됨", cardClassName: "opacity-50" };
  }
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
  // 상태에 따른 배지 설정 및 카드 스타일 계산
  const statusBadge = getStatusBadge(invoice.status);

  return (
    <Card
      className={cn(
        "transition-shadow hover:shadow-md",
        statusBadge.cardClassName
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold">
            {invoice.invoiceNumber}
          </CardTitle>
          {/* 상태 배지: 5가지 상태 (대기 중 / 유효 / 만료됨 / 완료 / 취소됨) */}
          <Badge
            variant={statusBadge.variant}
            className={statusBadge.badgeClassName}
          >
            {statusBadge.label}
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
