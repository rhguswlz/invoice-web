/**
 * 견적서 전역 상태 관리 스토어 (Zustand)
 *
 * 기능:
 * - 견적서 상세 데이터 클라이언트 캐싱 (동일 견적서 재조회 방지)
 * - 견적서 목록 캐싱
 * - PDF 다운로드 로딩 상태 관리
 */
"use client";

import { create } from "zustand";
import type { Invoice, InvoiceListItem } from "@/types";

// ============================================================
// 스토어 상태 타입 정의
// ============================================================

interface InvoiceStore {
  // 견적서 상세 캐시 (키: 노션 페이지 ID)
  invoiceCache: Record<string, Invoice>;
  // 견적서 목록 캐시
  invoiceList: InvoiceListItem[] | null;
  // 목록 마지막 로드 시각 (캐시 만료 판단용)
  listFetchedAt: number | null;
  // PDF 다운로드 진행 중 여부
  isPdfLoading: boolean;

  // 견적서 상세를 캐시에 저장
  cacheInvoice: (invoice: Invoice) => void;
  // 견적서 목록을 캐시에 저장
  cacheInvoiceList: (list: InvoiceListItem[]) => void;
  // 특정 ID의 캐시된 견적서를 반환 (없으면 undefined)
  getCachedInvoice: (id: string) => Invoice | undefined;
  // PDF 로딩 상태 업데이트
  setPdfLoading: (loading: boolean) => void;
  // 캐시 전체 초기화
  clearCache: () => void;
}

// ============================================================
// 캐시 만료 시간 설정 (5분)
// 노션 데이터는 자주 변경되지 않으므로 5분 캐싱으로 불필요한 재조회를 줄임
// ============================================================
const CACHE_TTL_MS = 5 * 60 * 1000;

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoiceCache: {},
  invoiceList: null,
  listFetchedAt: null,
  isPdfLoading: false,

  cacheInvoice: (invoice) =>
    set((state) => ({
      invoiceCache: { ...state.invoiceCache, [invoice.id]: invoice },
    })),

  cacheInvoiceList: (list) =>
    set({ invoiceList: list, listFetchedAt: Date.now() }),

  getCachedInvoice: (id) => get().invoiceCache[id],

  setPdfLoading: (loading) => set({ isPdfLoading: loading }),

  clearCache: () =>
    set({ invoiceCache: {}, invoiceList: null, listFetchedAt: null }),
}));

/**
 * 견적서 목록 캐시가 유효한지 확인합니다.
 * 마지막 로드 후 5분이 지나지 않았으면 캐시를 재사용합니다.
 */
export function isListCacheValid(listFetchedAt: number | null): boolean {
  if (!listFetchedAt) return false;
  return Date.now() - listFetchedAt < CACHE_TTL_MS;
}
