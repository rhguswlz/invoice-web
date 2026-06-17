import { AdminHeader } from "@/components/admin/admin-header";
import { AdminInvoiceTable } from "@/components/admin/admin-invoice-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { InvoiceListItem } from "@/types";

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

async function getAdminInvoices(): Promise<InvoiceListItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/admin/invoices`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("견적서 목록 조회 실패");
  }

  const data = await response.json();
  return data.data || [];
}

export default async function AdminInvoicesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const statusFilter = params.status;
  const invoices = await getAdminInvoices();

  const filteredInvoices = statusFilter
    ? invoices.filter((inv) => inv.status === statusFilter)
    : invoices;

  return (
    <>
      <AdminHeader title="견적서 목록" />
      <div className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>견적서 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={statusFilter || "all"} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all" asChild>
                  <a href="/admin/invoices">전체</a>
                </TabsTrigger>
                <TabsTrigger value="active" asChild>
                  <a href="/admin/invoices?status=active">진행중</a>
                </TabsTrigger>
                <TabsTrigger value="expired" asChild>
                  <a href="/admin/invoices?status=expired">만료됨</a>
                </TabsTrigger>
                <TabsTrigger value="pending" asChild>
                  <a href="/admin/invoices?status=pending">대기중</a>
                </TabsTrigger>
              </TabsList>
              <TabsContent value={statusFilter || "all"}>
                <AdminInvoiceTable invoices={filteredInvoices} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
