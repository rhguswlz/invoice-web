import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { InvoiceListItem } from "@/types";

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

function getStatusBadgeVariant(status: string) {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    active: "default",
    expired: "destructive",
    pending: "secondary",
    completed: "outline",
    cancelled: "outline",
  };
  return variants[status] || "secondary";
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    active: "진행중",
    expired: "만료됨",
    pending: "대기중",
    completed: "완료",
    cancelled: "취소됨",
  };
  return labels[status] || status;
}

export default async function AdminDashboardPage() {
  const invoices = await getAdminInvoices();

  const stats = {
    total: invoices.length,
    active: invoices.filter((inv) => inv.status === "active").length,
    expired: invoices.filter((inv) => inv.status === "expired").length,
    pending: invoices.filter((inv) => inv.status === "pending").length,
  };

  const recentInvoices = invoices.slice(0, 5);

  return (
    <>
      <AdminHeader title="대시보드" />
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">전체 견적서</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">진행중</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">만료됨</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">대기중</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>최근 견적서</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">견적서 번호</th>
                    <th className="text-left py-2 px-4">고객명</th>
                    <th className="text-left py-2 px-4">발행일</th>
                    <th className="text-left py-2 px-4">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-4 font-medium">{invoice.number}</td>
                      <td className="py-2 px-4">{invoice.clientName}</td>
                      <td className="py-2 px-4">{invoice.issuedAt}</td>
                      <td className="py-2 px-4">
                        <Badge variant={getStatusBadgeVariant(invoice.status)}>
                          {getStatusLabel(invoice.status)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
