# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

노션 데이터베이스에 입력한 견적서를 웹 브라우저에서 바로 조회하고 PDF로 다운로드할 수 있는 서비스입니다. Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS v4, shadcn/ui를 사용합니다.

**⚠️ Next.js 16은 학습 데이터와 Breaking Changes가 있으므로** 새 코드 작성 전 반드시 `AGENTS.md`와 `node_modules/next/dist/docs/`를 확인하세요.

## 개발 명령어

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

## 환경 변수

`.env.local` 파일에 아래 세 가지를 설정해야 앱이 실행됩니다. `lib/notion.ts`가 모듈 로드 시점에 누락 여부를 검사하므로, 설정 없이 실행하면 서버가 즉시 오류를 던집니다.

```bash
NOTION_API_TOKEN=secret_xxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

노션 인테그레이션 생성: https://www.notion.so/my-integrations

## 아키텍처

### 데이터 흐름

```
Notion DB
  → app/api/invoices/route.ts          (GET /api/invoices — 목록)
  → app/api/invoices/[id]/route.ts     (GET /api/invoices/[id] — 단건)
  → lib/invoice-mapper.ts              (Notion 응답 → Invoice 도메인 타입)
  → app/invoices/page.tsx              (서버 컴포넌트 — 목록 페이지)
  → app/invoices/[id]/page.tsx         (서버 컴포넌트 — 뷰어 페이지)
  → components/invoice/                (렌더링 UI)
```

**Notion API 토큰은 서버 사이드에서만 사용합니다.** 페이지/컴포넌트에서 Notion API를 직접 호출하지 않고, 반드시 Route Handler(`app/api/`)를 프록시로 경유합니다.

### 서버/클라이언트 경계

- **서버 컴포넌트:** 목록·뷰어 페이지(`app/invoices/`), API Route Handler
- **클라이언트 컴포넌트:** `InvoiceViewer`(PDF 다운로드 버튼, Zustand), `Header`/`MobileMenu`(네비게이션 인터랙션)
- 서버 컴포넌트에서 내부 fetch 시 반드시 `NEXT_PUBLIC_BASE_URL`을 prefix로 사용 (fallback: `http://localhost:3000`)

### 상태 관리 (Zustand)

`store/invoice-store.ts`의 `useInvoiceStore`는 두 가지 역할만 합니다:
1. 견적서 상세/목록 클라이언트 캐시 (TTL 5분, `isListCacheValid()` 함수로 검사)
2. PDF 다운로드 로딩 상태 (`isPdfLoading`)

### PDF 다운로드

`window.print()` + `@media print` CSS 방식을 채택했습니다. `html2canvas`/`jsPDF` 패키지가 설치되어 있지만 **현재 사용하지 않습니다**. `globals.css`에 `@media print` 스타일 완성이 잔여 작업입니다(Phase 3).

## Notion 데이터베이스 스키마

`lib/invoice-mapper.ts`에서 아래 **한국어 속성명**을 하드코딩으로 참조합니다. 실제 노션 DB의 속성명과 정확히 일치해야 합니다.

| 속성명 | Notion 타입 |
|--------|------------|
| 제목 | Title |
| 발급일 | Date |
| 유효기간 | Date |
| 고객명 | Rich Text |
| 고객 담당자 | Rich Text |
| 고객 이메일 | Email |
| 고객 연락처 | Phone |
| 발급자명 | Rich Text |
| 발급자 이메일 | Email |
| 발급자 연락처 | Phone |
| 발급자 주소 | Rich Text |
| 사업자번호 | Rich Text |
| 비고 | Rich Text |

**품목 데이터는 페이지 본문의 테이블 블록에 저장합니다** (Properties가 아님). 열 순서는 `품목명 | 수량 | 단가 | 단위 | 설명`이며, 첫 번째 행은 헤더로 건너뜁니다. `notion.blocks.children.list()`로 조회합니다.

## Next.js 16 주요 변경사항

라우트 파라미터와 페이지 props의 `params`가 **Promise 타입**으로 바뀌었습니다. 반드시 `await`해야 합니다:

```tsx
// Route Handler
interface RouteParams {
  params: Promise<{ id: string }>;
}
export async function GET(_req: Request, { params }: RouteParams) {
  const { id } = await params;
}

// Page Component
interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
  const { id } = await params;
}
```

## 핵심 타입 및 모듈

**도메인 타입** (`types/index.ts`): `Invoice`, `InvoiceListItem`, `InvoiceItem`, `Issuer`, `Client`, `InvoiceStatus`, `ApiResponse<T>`

`InvoiceListItem`은 `Invoice`의 `Pick` 타입으로 목록 페이지용 경량 타입입니다. 목록에서 `totalAmount`는 품목 테이블을 별도 조회하지 않으므로 항상 `0`이며, 카드 UI에서는 `-`로 표시합니다.

**API 응답 래퍼** (`ApiResponse<T>`):
```ts
type ApiResponse<T> = { success: true; data: T } | { success: false; error: string }
```

**매핑 함수** (`lib/invoice-mapper.ts`):
- `mapPageToInvoiceListItem(page)` — 목록용, 블록 조회 없음
- `mapPageToInvoice(page, tableRows)` — 상세용, 테이블 블록 행 필요

## 설정 파일

- **`lib/constants.ts`**: `SITE_CONFIG`(사이트명·URL), `NAV_ITEMS`(헤더 네비게이션)
- **`lib/utils.ts`**: `cn()` — Tailwind 클래스 병합
- **`components.json`**: shadcn/ui style `radix-nova`, components alias `@/components`, ui alias `@/components/ui`
- **TypeScript 경로 alias**: `@/*` → `./*`

shadcn/ui 컴포넌트 설치 위치는 `components/ui/`입니다.

## 현재 개발 상태

Phase 1~2 완료, Phase 3 진행 중 (2026-06-10 기준). 잔여 작업:
- `app/globals.css`의 `@media print` 스타일 완성 (A4 크기, 헤더/푸터 숨김, 페이지 분할 방지)
- `app/not-found.tsx` 커스텀 404 메시지 보강
- `app/error.tsx` 재시도 버튼 및 오류 유형별 안내 추가

상세 내용: `docs/ROADMAP.md`
