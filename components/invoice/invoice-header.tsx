/**
 * 견적서 헤더 컴포넌트
 * 견적서 번호, 발급일, 유효기간, 발급자/고객 정보를 상단에 표시합니다.
 */
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import type { Invoice, InvoiceStatus } from "@/types";

interface InvoiceHeaderProps {
  /** 견적서 전체 데이터 */
  invoice: Invoice;
}

/** 상태 배너 설정 타입 */
interface StatusBannerConfig {
  /** 배너 컨테이너 색상 클래스 */
  className: string;
  /** 배너에 표시할 메시지 (아이콘 포함) */
  message: string;
}

/** 상태 배지 설정 타입 */
interface StatusBadgeConfig {
  /** shadcn 배지 variant */
  variant: "default" | "secondary" | "destructive" | "outline";
  /** 배지에 표시할 한국어 라벨 */
  label: string;
  /** 배지 커스텀 클래스 (완료 상태의 초록색 등) */
  badgeClassName?: string;
}

/**
 * 상태에 따른 상단 안내 배너 설정을 반환합니다.
 * 배너가 필요 없는 상태(대기/유효)는 null을 반환합니다.
 */
function getStatusBanner(status: InvoiceStatus): StatusBannerConfig | null {
  switch (status) {
    case "expired":
      return {
        className:
          "bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
        message: "⚠ 이 견적서의 유효기간이 만료되었습니다.",
      };
    case "cancelled":
      return {
        className:
          "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200",
        message: "✕ 이 견적서는 취소된 견적서입니다.",
      };
    case "completed":
      return {
        className:
          "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200",
        message: "✓ 이 견적서는 완료된 견적서입니다.",
      };
    default:
      // 대기(pending) / 유효(active) 상태는 배너를 표시하지 않음
      return null;
  }
}

/**
 * 상태에 따른 배지 설정을 반환합니다.
 */
function getStatusBadge(status: InvoiceStatus): StatusBadgeConfig {
  switch (status) {
    case "pending":
      return { variant: "outline", label: "대기 중" };
    case "active":
      return { variant: "default", label: "유효" };
    case "expired":
      return { variant: "secondary", label: "만료됨" };
    case "completed":
      return {
        variant: "default",
        label: "완료",
        badgeClassName:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0",
      };
    case "cancelled":
      return { variant: "destructive", label: "취소됨" };
  }
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
  // 상태별 배너 및 배지 설정 계산
  const banner = getStatusBanner(invoice.status);
  const statusBadge = getStatusBadge(invoice.status);

  return (
    <div className="space-y-6">
      {/* 상태 안내 배너: 만료/취소/완료 상태일 때만 표시 */}
      {banner && (
        <div className={`rounded-lg px-4 py-3 text-sm ${banner.className}`}>
          {banner.message}
        </div>
      )}

      {/* 견적서 번호 및 상태 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">견적서 번호</p>
          <h1 className="text-2xl font-bold">{invoice.invoiceNumber}</h1>
        </div>
        <Badge
          variant={statusBadge.variant}
          className={`text-sm ${statusBadge.badgeClassName ?? ""}`}
        >
          {statusBadge.label}
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
