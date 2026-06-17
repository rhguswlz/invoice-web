import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyLinkButton } from "./copy-link-button";
import { AdminPdfButton } from "./admin-pdf-button";
import type { InvoiceListItem } from "@/types";

interface AdminInvoiceTableProps {
  invoices: InvoiceListItem[];
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

export function AdminInvoiceTable({ invoices }: AdminInvoiceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted">
            <th className="text-left py-3 px-4 font-semibold">견적서 번호</th>
            <th className="text-left py-3 px-4 font-semibold">고객명</th>
            <th className="text-left py-3 px-4 font-semibold">발행일</th>
            <th className="text-left py-3 px-4 font-semibold">상태</th>
            <th className="text-right py-3 px-4 font-semibold">총금액</th>
            <th className="text-center py-3 px-4 font-semibold">작업</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4">
                <Link href={`/invoices/${invoice.id}`} className="font-medium text-blue-600 hover:underline">
                  {invoice.number}
                </Link>
              </td>
              <td className="py-3 px-4">{invoice.clientName}</td>
              <td className="py-3 px-4">{invoice.issuedAt}</td>
              <td className="py-3 px-4">
                <Badge variant={getStatusBadgeVariant(invoice.status)}>
                  {getStatusLabel(invoice.status)}
                </Badge>
              </td>
              <td className="py-3 px-4 text-right">
                {invoice.totalAmount > 0
                  ? invoice.totalAmount.toLocaleString("ko-KR")
                  : "-"}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-center gap-2">
                  <CopyLinkButton invoiceId={invoice.id} />
                  <AdminPdfButton invoiceId={invoice.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
