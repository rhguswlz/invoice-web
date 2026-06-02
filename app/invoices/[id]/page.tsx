/**
 * 견적서 뷰어 페이지 (서버 컴포넌트)
 *
 * 노션 페이지 ID 기반 동적 라우트로 특정 견적서를 조회하여 렌더링합니다.
 * 존재하지 않는 ID 접근 시 notFound()를 호출하여 404 페이지로 이동합니다.
 */
import { notFound } from "next/navigation";
import { InvoiceViewer } from "@/components/invoice/invoice-viewer";
import type { ApiResponse, Invoice } from "@/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * 특정 견적서를 서버에서 조회합니다.
 */
async function fetchInvoice(id: string): Promise<Invoice | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/invoices/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("견적서를 불러오지 못했습니다.");
  }

  const json: ApiResponse<Invoice> = await res.json();

  if (!json.success) return null;

  return json.data;
}

/**
 * 견적서 번호를 페이지 타이틀에 반영합니다.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const invoice = await fetchInvoice(id);

  return {
    title: invoice ? `견적서 ${invoice.invoiceNumber}` : "견적서를 찾을 수 없습니다",
  };
}

export default async function InvoiceViewerPage({ params }: PageProps) {
  const { id } = await params;
  const invoice = await fetchInvoice(id);

  // 견적서가 없으면 Next.js 기본 404 페이지로 이동
  if (!invoice) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <InvoiceViewer invoice={invoice} />
    </div>
  );
}
