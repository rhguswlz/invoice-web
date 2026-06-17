"use client";

import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminPdfButtonProps {
  invoiceId: string;
}

export function AdminPdfButton({ invoiceId }: AdminPdfButtonProps) {
  const handlePdf = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const url = `${baseUrl}/invoices/${invoiceId}?print=1`;
    window.open(url, "_blank");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handlePdf}
      title="PDF 다운로드"
    >
      <FileDown className="h-4 w-4" />
    </Button>
  );
}
