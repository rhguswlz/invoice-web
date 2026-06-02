/**
 * 견적서 목록 페이지 (서버 컴포넌트)
 *
 * 노션 데이터베이스에서 전체 견적서 목록을 조회하여 카드 형태로 표시합니다.
 * 서버 컴포넌트로 구현하여 초기 로드 시 SEO와 성능을 최적화합니다.
 */
import { Suspense } from "react";
import { InvoiceCard } from "@/components/invoice/invoice-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ApiResponse, InvoiceListItem } from "@/types";

/**
 * 노션에서 견적서 목록을 가져옵니다.
 * 서버 사이드 fetch로 노션 API 토큰을 외부에 노출하지 않습니다.
 */
async function fetchInvoiceList(): Promise<InvoiceListItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/invoices`, {
    // 요청마다 최신 데이터를 가져오도록 캐시 비활성화
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("견적서 목록을 불러오지 못했습니다.");
  }

  const json: ApiResponse<InvoiceListItem[]> = await res.json();

  if (!json.success) {
    throw new Error(json.error);
  }

  return json.data;
}

/**
 * 목록 로딩 중 스켈레톤 UI
 */
function InvoiceListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-44 rounded-lg" />
      ))}
    </div>
  );
}

/**
 * 견적서 목록을 실제로 렌더링하는 비동기 서버 컴포넌트
 */
async function InvoiceList() {
  const invoices = await fetchInvoiceList();

  if (invoices.length === 0) {
    return (
      <div className="rounded-lg border py-16 text-center text-muted-foreground">
        <p className="text-lg font-medium">등록된 견적서가 없습니다.</p>
        <p className="mt-1 text-sm">
          노션 데이터베이스에 견적서를 추가하면 여기에 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
}

export default function InvoicesPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">견적서 목록</h1>
        <p className="mt-1 text-muted-foreground">
          노션 데이터베이스에 등록된 전체 견적서를 확인할 수 있습니다.
        </p>
      </div>

      {/* Suspense로 목록 로딩 중 스켈레톤 표시 */}
      <Suspense fallback={<InvoiceListSkeleton />}>
        <InvoiceList />
      </Suspense>
    </div>
  );
}
