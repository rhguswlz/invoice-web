/**
 * 견적서 뷰어 컴포넌트 (클라이언트 컴포넌트)
 *
 * 견적서 전체 내용을 렌더링하며 PDF 다운로드 기능을 제공합니다.
 * PDF 다운로드는 window.print() + 인쇄 전용 CSS 방식으로 구현합니다.
 */
"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Printer } from "lucide-react";
import { useInvoiceStore } from "@/store/invoice-store";
import { InvoiceHeader } from "./invoice-header";
import { InvoiceItemsTable } from "./invoice-items-table";
import { InvoiceSummary } from "./invoice-summary";
import type { Invoice } from "@/types";

interface InvoiceViewerProps {
  /** 렌더링할 견적서 데이터 */
  invoice: Invoice;
}

export function InvoiceViewer({ invoice }: InvoiceViewerProps) {
  const { isPdfLoading, setPdfLoading } = useInvoiceStore();

  /**
   * PDF 다운로드 핸들러
   * window.print()를 호출하여 브라우저 인쇄 다이얼로그를 열고,
   * 사용자가 "PDF로 저장"을 선택하면 파일이 저장됩니다.
   * globals.css의 @media print 스타일로 인쇄 레이아웃을 제어합니다.
   */
  const handlePdfDownload = useCallback(() => {
    setPdfLoading(true);
    // 인쇄 다이얼로그가 열리는 동안 로딩 상태 유지
    setTimeout(() => {
      window.print();
      setPdfLoading(false);
    }, 300);
  }, [setPdfLoading]);

  return (
    <div>
      {/* PDF 다운로드 버튼 영역 (인쇄 시 숨김 처리됨) */}
      <div className="mb-6 flex justify-end gap-2 print:hidden">
        <Button
          variant="outline"
          onClick={handlePdfDownload}
          disabled={isPdfLoading}
        >
          <Printer className="mr-2 h-4 w-4" />
          인쇄
        </Button>
        <Button onClick={handlePdfDownload} disabled={isPdfLoading}>
          <Download className="mr-2 h-4 w-4" />
          {isPdfLoading ? "준비 중..." : "PDF 다운로드"}
        </Button>
      </div>

      {/* 견적서 본문: 인쇄 시에도 동일한 레이아웃 유지 */}
      <div className="rounded-lg border bg-card p-8 shadow-sm print:border-0 print:shadow-none">
        {/* 헤더: 견적서 번호, 날짜, 발급자/고객 정보 */}
        <InvoiceHeader invoice={invoice} />

        <Separator className="my-6" />

        {/* 품목 테이블 */}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
            품목 내역
          </h2>
          <InvoiceItemsTable items={invoice.items} />
        </section>

        <Separator className="my-6" />

        {/* 합계 및 비고 */}
        <InvoiceSummary invoice={invoice} />
      </div>
    </div>
  );
}
