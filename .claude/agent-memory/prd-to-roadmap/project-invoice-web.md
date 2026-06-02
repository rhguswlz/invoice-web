---
name: project-invoice-web
description: invoice-web 프로젝트 현황 — Notion 기반 견적서 서비스, Phase 1~2 완료 상태
metadata:
  type: project
---

invoice-web은 Notion API를 백엔드로 사용하는 견적서 공유 서비스이다. 2026-06-03 기준 Phase 1(기반 설정)과 Phase 2(API + 핵심 UI)가 완료된 상태로, Phase 3(PDF 완성 + 오류 처리)부터 작업이 남아있다.

**Why:** PRD에서 기술 스택과 기능 명세는 상세했으나, 팀 규모/전체 기간 정보가 없어 1인 개발 체제로 가정하고 로드맵을 수립했다.

**How to apply:** 다음 로드맵 업데이트 요청 시, Phase 3(PDF @media print) → Phase 4(Vercel 배포) → Phase 5(마무리) 순서로 진행 중임을 먼저 확인하라.

## 구현 완료 항목 (확인됨)
- lib/notion.ts: Notion 클라이언트 초기화
- lib/invoice-mapper.ts: Notion Page → Invoice 도메인 모델 변환
- lib/validations.ts: Zod 스키마 (Notion 속성 포함)
- types/index.ts: Invoice, Issuer, Client, InvoiceItem, InvoiceListItem, ApiResponse
- app/api/invoices/route.ts + [id]/route.ts: Route Handler
- app/invoices/page.tsx + [id]/page.tsx: 목록/뷰어 페이지
- app/page.tsx: 홈 랜딩
- components/invoice/: invoice-viewer, invoice-header, invoice-items-table, invoice-summary, invoice-card
- store/invoice-store.ts: Zustand (캐시 + PDF 로딩 상태)
- PDF: window.print() 방식 채택 (html2canvas+jsPDF 패키지는 설치됨)

## 주요 아키텍처 결정
- PDF: window.print() + @media print CSS (html2canvas+jsPDF는 설치만 되어 있음)
- 견적서 목록에서 totalAmount=0으로 처리 (블록 API 호출 생략)
- 품목 데이터: Notion 테이블 블록으로 저장, 열 순서 = 품목명|수량|단가|단위|설명

[[project-invoice-web-risks]]
