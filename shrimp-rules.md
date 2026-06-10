# Development Guidelines — invoice-web

## 1. 프로젝트 개요

- **목적:** 노션 데이터베이스에 입력한 견적서를 웹에서 조회하고 PDF로 다운로드하는 서비스
- **기술 스택:** Next.js 16 App Router · React 19 · TypeScript 5 (strict) · Tailwind CSS v4 · shadcn/ui (radix-nova) · Zustand · Zod · @notionhq/client 5.x
- **개발 단계:** Phase 1~2 완료 / **Phase 3 진행 중** (2026-06-10 기준)
- **패키지 관리:** npm

---

## 2. 프로젝트 아키텍처

### 디렉토리 구조

```
app/
  api/invoices/route.ts          → GET /api/invoices (목록)
  api/invoices/[id]/route.ts     → GET /api/invoices/[id] (단건)
  invoices/page.tsx              → 서버 컴포넌트 — 목록 페이지
  invoices/[id]/page.tsx         → 서버 컴포넌트 — 뷰어 페이지
  globals.css                    → Tailwind + @media print 스타일
  layout.tsx                     → 루트 레이아웃 (Header + Footer + Providers)
components/
  invoice/                       → 견적서 전용 UI 컴포넌트
  layout/                        → Header · Footer · PageContainer · Section
  ui/                            → shadcn/ui 컴포넌트 (여기에만 설치)
lib/
  notion.ts                      → Notion 클라이언트 싱글톤
  invoice-mapper.ts              → Notion 응답 → Invoice 도메인 변환
  constants.ts                   → SITE_CONFIG · NAV_ITEMS
  validations.ts                 → Zod 스키마
  utils.ts                       → cn() 유틸리티
store/
  invoice-store.ts               → Zustand 스토어 (캐시 + PDF 로딩)
types/
  index.ts                       → 도메인 타입 정의
```

### 데이터 흐름

```
Notion DB → Route Handler (app/api/) → invoice-mapper.ts → 서버 컴포넌트 → 클라이언트 UI
```

---

## 3. ⚠️ Next.js 16 Breaking Change — params 반드시 await

- **Route Handler와 Page 컴포넌트의 `params`는 Promise 타입**이다.
- `await params` 없이 구조 분해하면 TypeScript 오류 + 런타임 오류가 발생한다.

```tsx
// Route Handler
interface RouteParams { params: Promise<{ id: string }> }
export async function GET(_req: Request, { params }: RouteParams) {
  const { id } = await params;  // 반드시 await
}

// Page Component
interface PageProps { params: Promise<{ id: string }> }
export default async function Page({ params }: PageProps) {
  const { id } = await params;  // 반드시 await
}
```

- 새 코드 작성 전 `node_modules/next/dist/docs/` 확인 필수
- `AGENTS.md` 규칙을 항상 준수한다

---

## 4. 서버/클라이언트 경계 규칙

### 서버 컴포넌트 (서버에서만 실행)
- `app/invoices/page.tsx`, `app/invoices/[id]/page.tsx`
- `app/api/` 하위 Route Handler 전체

### 클라이언트 컴포넌트 (`"use client"` 선언 필수)
- `components/invoice/invoice-viewer.tsx` — PDF 다운로드 버튼, Zustand 사용
- `components/layout/header.tsx` — 네비게이션 인터랙션
- `components/mobile-menu.tsx`
- `components/providers.tsx` — ThemeProvider, Toaster
- `store/invoice-store.ts`

### ❌ 금지: 클라이언트 컴포넌트에서 Notion API 직접 호출
- 클라이언트에서 `@notionhq/client`를 import하거나 Notion API를 직접 호출하지 않는다.
- Notion API 토큰은 서버 사이드에서만 사용한다.
- **모든 Notion 데이터 접근은 Route Handler(`app/api/`) 경유가 필수다.**

---

## 5. Notion API 연동 규칙

### 환경 변수 (필수 3개)
```
NOTION_API_TOKEN=secret_xxx
NOTION_DATABASE_ID=xxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
- `lib/notion.ts`가 모듈 로드 시점에 누락 여부를 검사한다 — 없으면 서버가 즉시 오류를 던진다.

### 내부 fetch 규칙
- 서버 컴포넌트에서 Route Handler를 내부 fetch로 호출할 때 반드시 `NEXT_PUBLIC_BASE_URL` prefix를 사용한다.
```ts
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
const res = await fetch(`${baseUrl}/api/invoices`);
```

### ⚠️ 노션 데이터베이스 속성명 — 한국어 하드코딩

`lib/invoice-mapper.ts`는 아래 **한국어 속성명**을 그대로 키로 사용한다.
**절대 영어로 변경하지 않는다. 실제 노션 DB 속성명과 정확히 일치해야 한다.**

| 코드 내 키 | Notion 타입 |
|-----------|------------|
| `props["제목"]` | Title |
| `props["발급일"]` | Date |
| `props["유효기간"]` | Date |
| `props["고객명"]` | Rich Text |
| `props["고객 담당자"]` | Rich Text |
| `props["고객 이메일"]` | Email |
| `props["고객 연락처"]` | Phone |
| `props["발급자명"]` | Rich Text |
| `props["발급자 이메일"]` | Email |
| `props["발급자 연락처"]` | Phone |
| `props["발급자 주소"]` | Rich Text |
| `props["사업자번호"]` | Rich Text |
| `props["비고"]` | Rich Text |

### 품목 데이터 위치
- **품목 목록은 페이지 본문 테이블 블록에 저장된다** (Properties가 아님).
- `notion.blocks.children.list(block_id)` 로 조회한다.
- 테이블 열 순서: `품목명(0) | 수량(1) | 단가(2) | 단위(3) | 설명(4)`
- **첫 번째 행은 헤더이므로 `.slice(1)`로 건너뛴다.**

---

## 6. 타입 정의 규칙

### 핵심 타입 위치: `types/index.ts`
- `Invoice` — 견적서 전체 (상세 페이지용)
- `InvoiceListItem` — `Invoice`의 Pick 타입 (목록 페이지용 경량)
- `InvoiceItem` — 품목
- `Issuer` — 발급자
- `Client` — 고객
- `InvoiceStatus` — `"active" | "expired"`
- `ApiResponse<T>` — `{ success: true; data: T } | { success: false; error: string }`

### ⚠️ 동기화 필수: `types/index.ts` ↔ `lib/validations.ts`
- `types/index.ts`의 타입을 변경하면 반드시 `lib/validations.ts`의 Zod 스키마도 동시에 수정한다.
- 역방향도 동일하다.

### InvoiceListItem.totalAmount 의도적 0 처리
- 목록 조회 시 각 페이지의 블록(품목 테이블)을 별도 조회하지 않으므로 `totalAmount`는 항상 `0`이다.
- `invoice-card.tsx`에서 `totalAmount === 0`이면 "-"로 표시한다. **이 동작은 의도적이다. 수정하지 않는다.**

---

## 7. 상태 관리 규칙 (Zustand)

- 스토어 파일: `store/invoice-store.ts`의 `useInvoiceStore` 하나만 존재한다.
- **역할 2가지만 담당한다:**
  1. 견적서 상세/목록 클라이언트 캐시 (TTL 5분, `isListCacheValid()` 함수로 검사)
  2. PDF 다운로드 로딩 상태 (`isPdfLoading`, `setPdfLoading`)
- 새로운 전역 상태가 필요하면 이 스토어에 추가한다 (새 스토어 파일 생성 금지).

---

## 8. PDF 다운로드 구현 규칙

- **현재 구현:** `window.print()` + `@media print` CSS 방식
- `html2canvas`, `jsPDF` 패키지가 설치되어 있지만 **현재 사용하지 않는다.**
- `invoice-viewer.tsx`의 `handlePdfDownload`는 `window.print()`를 호출한다.
- `app/globals.css`에 `@media print` 스타일을 추가하여 인쇄 레이아웃을 제어한다.
- **❌ html2canvas/jsPDF를 신규로 사용하는 코드를 추가하지 않는다** (명시적 요청이 없는 한).

### @media print 작성 위치
- **반드시 `app/globals.css`에 작성한다.**
- A4 크기: `@page { size: A4; margin: 1cm }`
- 헤더/푸터 숨김: `.print:hidden` 클래스 사용 (이미 `invoice-viewer.tsx`에 적용됨)
- 품목 테이블 페이지 분할 방지: `break-inside: avoid`

---

## 9. 컴포넌트 추가 규칙

### shadcn/ui 컴포넌트
- 설치 경로: `components/ui/` (고정)
- 설치 명령: `npx shadcn add <component-name>`
- `components.json` 설정: style `radix-nova`, alias `@/components/ui`

### 신규 컴포넌트 작성 위치
| 유형 | 경로 |
|------|------|
| 견적서 전용 UI | `components/invoice/` |
| 레이아웃 (헤더/푸터 등) | `components/layout/` |
| 전역 공용 컴포넌트 | `components/` 루트 |
| shadcn/ui 컴포넌트 | `components/ui/` |

### 경로 alias
- `@/*` → 프로젝트 루트 (예: `@/lib/utils`, `@/types`, `@/components/ui/button`)

---

## 10. API Route Handler 작성 규칙

- 모든 Route Handler는 `app/api/` 하위에 위치한다.
- 응답은 반드시 `ApiResponse<T>` 래퍼 형식을 사용한다:
  ```ts
  // 성공
  return NextResponse.json({ success: true, data: ... });
  // 실패
  return NextResponse.json({ success: false, error: "..." }, { status: 500 });
  ```
- Notion 404 오류(status 404)는 HTTP 404로 변환하여 반환한다.
- Notion API 토큰(`NOTION_API_TOKEN`)은 Route Handler에서만 사용한다.

---

## 11. 코드 스타일 및 주석 규칙

- **들여쓰기:** 2칸 (스페이스)
- **변수/함수명:** camelCase (영어)
- **컴포넌트명:** PascalCase
- **모든 주석:** 한국어로 작성
- **JSDoc:** 공개 함수와 컴포넌트에 한국어로 작성
- **`"use client"` 선언:** 파일 최상단 첫 번째 줄에 위치

---

## 12. 파일 상호작용 규칙 (동시 수정 필요)

| 변경 내용 | 함께 수정해야 할 파일 |
|-----------|----------------------|
| 도메인 타입 추가/변경 | `types/index.ts` + `lib/validations.ts` |
| Notion 속성 매핑 변경 | `lib/invoice-mapper.ts` |
| 사이트명·URL 변경 | `lib/constants.ts`의 `SITE_CONFIG` |
| 네비게이션 메뉴 변경 | `lib/constants.ts`의 `NAV_ITEMS` |
| 새 API 엔드포인트 추가 | `app/api/` 하위 Route Handler 생성 |
| 인쇄 레이아웃 변경 | `app/globals.css`의 `@media print` |

---

## 13. Phase 3 잔여 작업 (진행 중)

현재 미완성 항목 — 이 파일들을 수정할 때 아래 맥락을 참고한다:

- **`app/globals.css`** — `@media print` 스타일 추가 필요 (A4, 헤더 숨김, break-inside)
- **`app/not-found.tsx`** — 커스텀 404 안내 메시지 보강 필요 ("목록으로 돌아가기" 링크)
- **`app/error.tsx`** — 재시도 버튼(`router.refresh()`) + 오류 유형별 안내 메시지 추가 필요

---

## 14. 금지 사항

- ❌ `lib/notion.ts`를 클라이언트 컴포넌트에서 import하지 않는다
- ❌ `invoice-mapper.ts`의 한국어 속성명 키(`"발급일"`, `"고객명"` 등)를 영어로 변경하지 않는다
- ❌ `html2canvas` / `jsPDF`를 신규로 사용하는 코드를 추가하지 않는다 (명시적 요청 없는 한)
- ❌ `types/index.ts`만 변경하고 `lib/validations.ts` 스키마를 동기화하지 않는 것
- ❌ `CLAUDE.md`, `AGENTS.md` 파일을 수정하지 않는다
- ❌ 서버 컴포넌트(`app/invoices/` 하위)에 `"use client"` 지시문을 추가하지 않는다
- ❌ 새로운 Zustand 스토어 파일을 생성하지 않는다 (`store/invoice-store.ts`에 추가)
- ❌ shadcn/ui 컴포넌트를 `components/ui/` 외부 경로에 직접 생성하지 않는다
- ❌ 환경 변수 `NOTION_API_TOKEN`을 클라이언트 사이드 코드에서 참조하지 않는다 (`NEXT_PUBLIC_` prefix 없음)
