# 노션 기반 견적서 웹 서비스 개발 로드맵

> 마지막 업데이트: 2026-06-03 | 버전: 1.0

---

## 프로젝트 개요

### 비전
노션 데이터베이스에 입력한 견적서를 클라이언트가 웹 브라우저에서 즉시 확인하고 PDF로 다운로드할 수 있는 최소한의 견적서 공유 서비스

### 목표
- 발급자가 별도의 견적서 소프트웨어 없이 노션만으로 견적서를 발행하고 공유할 수 있도록 한다
- 클라이언트가 설치 없이 링크 하나로 견적서를 열람하고 PDF로 저장할 수 있도록 한다
- Notion API ↔ Next.js Route Handler ↔ 뷰어 UI의 서버/클라이언트 경계를 명확히 유지한다

### 성공 지표 (KPI)

| 지표 | 현재값 | 목표값 | 측정 방법 |
|------|--------|--------|----------|
| 견적서 뷰어 페이지 로드 시간 | - | 2초 이내 | Vercel Analytics |
| PDF 다운로드 성공률 | - | 99% 이상 | 브라우저 print 완료 여부 |
| Notion API 오류 응답률 | - | 1% 미만 | 서버 로그 모니터링 |
| 빌드 성공 여부 | - | 100% | Vercel CI/CD 파이프라인 |

---

## MVP 범위

### 핵심 가설
노션을 이미 사용하는 프리랜서/소규모 사업자는 별도 견적서 도구 없이, 노션 데이터베이스 + 공유 링크만으로도 견적서 발행/공유 워크플로우를 완성할 수 있다.

### MVP 포함 기능
- [x] F010: Notion API 연동 설정 (환경 변수 기반 클라이언트 초기화) — **완료**
- [x] F011: 견적서 데이터 매핑 (Notion 페이지 속성 → Invoice 도메인 모델) — **완료**
- [x] F001: 견적서 조회 (Route Handler + 서버 컴포넌트) — **완료**
- [x] F002: 견적서 항목 표시 (뷰어 UI 컴포넌트) — **완료**
- [x] F004: 견적서 목록 조회 (목록 페이지) — **완료**
- [x] F003: PDF 다운로드 (window.print + @media print CSS) — **완료**
- [x] F012: 오류 처리 (404/500 핸들링) — **기본 구현 완료, 보강 필요**
- [ ] 인쇄 전용 CSS (`@media print`) 스타일 완성 — **미완료**
- [ ] 환경 변수 누락 시 런타임 안내 UI — **미완료**
- [ ] Vercel 배포 및 환경 변수 설정 — **미완료**

### MVP 제외 기능 (이후 개발)
- 발급자 인증/로그인 (Post-MVP)
- 견적서 승인/거절 워크플로우 (Post-MVP)
- 이메일 자동 발송 (Post-MVP)
- 견적서 상태 실시간 추적 (Post-MVP)
- 다국어 지원 (Post-MVP)
- 커스텀 템플릿 (Post-MVP)
- 실시간 알림 (Post-MVP)

---

## 현재 구현 상태 (2026-06-03 기준)

아래 항목들은 이미 코드베이스에 구현되어 있습니다. 각 Phase의 작업 항목에 **[완료]** 표시를 함께 기재하여 잔여 작업을 명확히 구분합니다.

| 파일/모듈 | 구현 내용 | 상태 |
|-----------|-----------|------|
| `lib/notion.ts` | Notion 클라이언트 초기화, 환경 변수 검증 | 완료 |
| `lib/invoice-mapper.ts` | Notion Page → Invoice/InvoiceListItem 매핑 | 완료 |
| `lib/validations.ts` | Zod 스키마 (Invoice, Issuer, Client, InvoiceItem) | 완료 |
| `types/index.ts` | 도메인 타입 정의 (Invoice, Issuer, Client 등) | 완료 |
| `app/api/invoices/route.ts` | GET /api/invoices (목록 조회) | 완료 |
| `app/api/invoices/[id]/route.ts` | GET /api/invoices/[id] (단건 조회) | 완료 |
| `app/invoices/page.tsx` | 견적서 목록 페이지 (F004) | 완료 |
| `app/invoices/[id]/page.tsx` | 견적서 뷰어 페이지 (F001) | 완료 |
| `app/page.tsx` | 홈 랜딩 페이지 (서비스 소개) | 완료 |
| `components/invoice/invoice-viewer.tsx` | 뷰어 + PDF 다운로드 버튼 (F002, F003) | 완료 |
| `components/invoice/invoice-header.tsx` | 견적서 헤더 (번호, 날짜, 발급자/고객 정보) | 완료 |
| `components/invoice/invoice-items-table.tsx` | 품목 테이블 | 완료 |
| `components/invoice/invoice-summary.tsx` | 금액 합계 + 비고 | 완료 |
| `components/invoice/invoice-card.tsx` | 목록 카드 컴포넌트 | 완료 |
| `store/invoice-store.ts` | Zustand 스토어 (캐시, PDF 로딩 상태) | 완료 |
| `lib/constants.ts` | SITE_CONFIG, NAV_ITEMS | 완료 |

---

## 개발 단계

### Phase 1: 기반 설정 및 도메인 모델링 — 2026-06-03 ~ 2026-06-05 ✅ 완료

**목표:** 프로젝트 초기화, 기술 스택 설치, Notion API 연동을 위한 서버 레이어 구축 완료

#### 인프라 & 설정
- [x] Next.js 16 + React 19 + TypeScript 5 프로젝트 초기화 — **완료**
- [x] Tailwind CSS v4 + shadcn/ui (radix-nova 스타일) 설정 — **완료**
- [x] Zustand, React Hook Form, Zod 패키지 설치 — **완료**
- [x] `@notionhq/client` 설치 및 `lib/notion.ts` 초기화 — **완료** (F010)
- [x] `html2canvas`, `jsPDF` 패키지 설치 — **완료** (F003 준비)
- [x] `.env.example` 파일 작성 (`NOTION_API_TOKEN`, `NOTION_DATABASE_ID`) — **완료**
- [x] `tsconfig.json` 경로 별칭 (`@/*`) 설정 — **완료**

#### 도메인 모델
- [x] `types/index.ts`: `Invoice`, `Issuer`, `Client`, `InvoiceItem`, `InvoiceListItem`, `ApiResponse` 타입 정의 — **완료**
- [x] `lib/validations.ts`: Zod 스키마 정의 (견적서 전체, 목록 아이템, Notion 속성 검증) — **완료**

#### Notion 데이터 레이어
- [x] `lib/notion.ts`: 환경 변수 누락 시 조기 오류 발생 로직 — **완료** (F010)
- [x] `lib/invoice-mapper.ts`: `mapPageToInvoiceListItem()` 구현 — **완료** (F011)
- [x] `lib/invoice-mapper.ts`: `mapPageToInvoice()` (테이블 블록 파싱 포함) 구현 — **완료** (F011)

#### 🧪 테스트

- [ ] Playwright MCP로 홈 페이지(`/`) 접근 시 환경 변수 안내 UI 렌더링 확인
  - `mcp__playwright__browser_navigate`로 `http://localhost:3000` 접근
  - `mcp__playwright__browser_snapshot`으로 환경 변수 안내 섹션 렌더링 확인
- [ ] Notion 환경 변수 누락 시 서버 오류 메시지 출력 여부 확인
  - 환경 변수 미설정 상태에서 `/api/invoices` 요청 후 오류 응답 검증
- [ ] TypeScript 빌드 오류 없음 확인 (`npm run build` 실행 후 결과 검증)

**완료 기준 (Definition of Done):**
- [x] `npm run build`가 오류 없이 통과된다
- [x] Notion 환경 변수 없이 실행 시 명확한 오류 메시지가 출력된다
- [x] TypeScript strict 모드에서 타입 오류가 없다
- [ ] **[API 연동·비즈니스 로직 포함 시 필수]** Playwright MCP E2E 테스트 통과 (정상 경로 + 오류 경로)

---

### Phase 2: API 레이어 및 핵심 UI 구현 — 2026-06-05 ~ 2026-06-09 ✅ 완료

**목표:** Next.js Route Handler로 Notion API 프록시 구현 및 견적서 뷰어/목록 UI 구성 완료

#### 백엔드 — Route Handlers
- [x] `app/api/invoices/route.ts`: `GET /api/invoices` 구현 (F004)
  - `notion.databases.query()` 호출
  - 발급일 내림차순 정렬
  - `mapPageToInvoiceListItem()` 변환
  - `ApiResponse<InvoiceListItem[]>` 형식 응답
- [x] `app/api/invoices/[id]/route.ts`: `GET /api/invoices/[id]` 구현 (F001, F011)
  - `notion.pages.retrieve()` + `notion.blocks.children.list()` 호출
  - `mapPageToInvoice()` 변환
  - Notion 404 오류 → HTTP 404 변환 (F012)

#### 상태 관리
- [x] `store/invoice-store.ts`: Zustand 스토어 구현
  - 견적서 상세 캐시 (`invoiceCache`)
  - 견적서 목록 캐시 (`invoiceList`, `listFetchedAt`)
  - PDF 로딩 상태 (`isPdfLoading`, `setPdfLoading`)

#### 프론트엔드 — 견적서 UI 컴포넌트
- [x] `components/invoice/invoice-header.tsx`: 견적서 헤더 (번호, 날짜, 발급자/고객 정보, 만료 배너) — **완료** (F002)
- [x] `components/invoice/invoice-items-table.tsx`: 품목 테이블 (품목명, 수량, 단가, 금액) — **완료** (F002)
- [x] `components/invoice/invoice-summary.tsx`: 금액 합계 섹션 (공급가액, 부가세 10%, 합계, 비고) — **완료** (F002)
- [x] `components/invoice/invoice-viewer.tsx`: 뷰어 통합 컴포넌트 + PDF 다운로드 버튼 — **완료** (F002, F003)
- [x] `components/invoice/invoice-card.tsx`: 목록 카드 컴포넌트 (상태 배지, 금액, 링크) — **완료** (F004)

#### 프론트엔드 — 페이지
- [x] `app/page.tsx`: 홈 랜딩 페이지 (서비스 소개, 이용 방법 3단계, 환경 변수 안내)
- [x] `app/invoices/page.tsx`: 견적서 목록 페이지 (Suspense + Skeleton) — **완료** (F004)
- [x] `app/invoices/[id]/page.tsx`: 견적서 뷰어 페이지 (`generateMetadata` 포함) — **완료** (F001)

#### 레이아웃
- [x] `components/layout/header.tsx`: 헤더 네비게이션 (홈, 견적서 목록)
- [x] `components/layout/footer.tsx`: 푸터
- [x] `lib/constants.ts`: `SITE_CONFIG`, `NAV_ITEMS` 설정

#### 🧪 테스트

- [ ] Playwright MCP로 정상 경로 E2E 검증
  - `mcp__playwright__browser_navigate`로 `/invoices` 목록 페이지 접근
  - `mcp__playwright__browser_snapshot`으로 카드 UI 렌더링 확인
  - `mcp__playwright__browser_navigate`로 `/invoices/[id]` 뷰어 페이지 접근
  - `mcp__playwright__browser_snapshot`으로 헤더/품목/합계 섹션 표시 확인
  - `mcp__playwright__browser_network_requests`로 `GET /api/invoices` 응답의 `data` 필드가 배열인지 확인
- [ ] 오류 경로 검증
  - 존재하지 않는 ID로 `GET /api/invoices/invalid-id` 요청 시 HTTP 404 응답 확인
  - 목록 카드 클릭 후 뷰어 페이지 전환 동작 확인
- [ ] Phase 2 구체적 시나리오
  - `browser_network_requests`로 `GET /api/invoices/[id]` 응답에 `issuer`, `client`, `items` 필드 존재 확인
  - 만료된 견적서 뷰어에서 만료 배너(`invoice-header.tsx`) 표시 확인

**완료 기준 (Definition of Done):**
- [x] `GET /api/invoices` 가 `InvoiceListItem[]` 배열을 정상 반환한다
- [x] `GET /api/invoices/[id]` 가 완전한 `Invoice` 객체를 정상 반환한다
- [x] 존재하지 않는 ID 요청 시 HTTP 404와 오류 메시지를 반환한다
- [x] 견적서 목록 페이지에서 카드 UI가 렌더링된다
- [x] 견적서 뷰어 페이지에서 헤더/품목/합계가 모두 표시된다
- [ ] **[API 연동·비즈니스 로직 포함 시 필수]** Playwright MCP E2E 테스트 통과 (정상 경로 + 오류 경로)

---

### Phase 3: PDF 출력 완성 및 오류 처리 강화 — 2026-06-10 ~ 2026-06-13

**목표:** PDF 인쇄 레이아웃 완성, F012 오류 처리 강화, 엣지 케이스 대응

#### PDF 다운로드 완성 (F003)
- [x] `invoice-viewer.tsx`에 `window.print()` 기반 PDF 다운로드 버튼 구현 — **완료**
- [x] `app/globals.css`에 `@media print` 스타일 완성
  - 인쇄 시 헤더/푸터/내비게이션 숨김 처리 (`print:hidden`)
  - 견적서 본문 A4 용지 크기 최적화 (`@page { size: A4; margin: 1cm }`)
  - 페이지 구분선이 품목 테이블 중간을 자르지 않도록 `break-inside: avoid` 적용
  - 컬러 배경색 인쇄 강제 적용 (`-webkit-print-color-adjust: exact`)
- [ ] 인쇄 미리보기에서 견적서 레이아웃 확인 및 조정

> **참고:** `html2canvas + jsPDF` 방식은 패키지가 이미 설치되어 있으나(`html2canvas`, `jsPDF`), 현재 구현은 `window.print()` 방식을 사용합니다. `window.print()` 방식으로 품질이 충분하다면 `html2canvas + jsPDF`는 사용하지 않습니다.

#### 오류 처리 강화 (F012)
- [x] `app/not-found.tsx` 커스텀 404 페이지 개선
  - 견적서를 찾을 수 없을 때 안내 메시지 추가
  - "목록으로 돌아가기" 링크 제공
- [x] `app/error.tsx` 커스텀 500 오류 페이지 개선
  - 재시도 버튼 (`router.refresh()`)
  - 오류 원인별 안내 메시지 (API 연결 실패, 만료된 견적서 등)
- [x] `app/invoices/[id]/page.tsx` 만료된 견적서 접근 시 안내 배너 확인
  - `invoice-header.tsx`의 만료 배너가 정상 표시되는지 E2E 검증
- [x] Notion API 토큰 유효하지 않을 때 사용자 친화적 메시지 출력 — **완료**
  - 두 Route Handler(`route.ts`, `[id]/route.ts`)에서 `isNotionClientError` + `APIErrorCode.Unauthorized`로 401 감지
  - HTTP 401 + "서비스 인증에 문제가 있습니다. 관리자에게 문의해 주세요." 메시지 반환

#### 엣지 케이스 대응
- [x] 노션 테이블 블록이 없는 견적서 (품목 0개) 처리 확인
  - `invoice-items-table.tsx`의 빈 상태 UI 동작 확인
- [x] `totalAmount = 0`인 목록 카드에서 "-" 표시 동작 확인
- [x] 노션 속성이 일부 누락된 페이지에서 매핑 오류 없이 처리되는지 확인
- [x] 환경 변수 `NEXT_PUBLIC_BASE_URL` 누락 시 fallback(`http://localhost:3000`) 동작 확인

**완료 기준 (Definition of Done):**
- [ ] 인쇄 다이얼로그에서 "PDF로 저장"을 선택하면 올바른 레이아웃의 PDF가 생성된다
- [ ] 존재하지 않는 견적서 ID 접근 시 커스텀 404 페이지가 표시된다
- [ ] 품목이 없는 견적서에서 빈 상태 UI가 표시된다
- [ ] `npm run build`가 오류 없이 통과된다

**리스크:**

| 리스크 | 확률 | 영향도 | 대응 방안 |
|--------|------|--------|----------|
| 브라우저별 `@media print` 렌더링 차이 | 중 | 중 | Chrome 기준 우선 구현, Safari/Firefox 순차 테스트 |
| 긴 품목 목록이 PDF 페이지를 넘칠 때 레이아웃 깨짐 | 중 | 중 | `break-inside: avoid` + 최대 높이 제한 적용 |

---

### Phase 4: 배포 및 운영 준비 — 2026-06-14 ~ 2026-06-17

**목표:** Vercel 배포, 환경 변수 운영 설정, 실제 노션 데이터베이스 연동 검증

#### Vercel 배포 (인프라)
- [ ] Vercel 프로젝트 생성 및 GitHub 저장소 연결
- [ ] Vercel 환경 변수 설정
  - `NOTION_API_TOKEN` (Production/Preview/Development)
  - `NOTION_DATABASE_ID` (Production/Preview/Development)
  - `NEXT_PUBLIC_BASE_URL` (Production: 실제 도메인)
- [ ] Vercel 첫 번째 배포 실행 및 빌드 로그 확인
- [ ] 배포된 URL에서 견적서 목록, 뷰어, PDF 다운로드 E2E 확인

#### 노션 데이터베이스 실제 연동 검증
- [ ] 프로덕션 노션 데이터베이스 구조 확인 (속성명이 매퍼와 일치하는지)
  - Invoices DB 필수 속성: 견적서 번호(Title), 발행일(Date), 유효기간(Date), 상태(Status), 클라이언트명명(Rich Text), 총금액(Number), 항목(Relation → Items DB)
  - Items DB 필수 속성: 항목명(Title), 수량(Number), 단가(Number), 금액(Formula), Invoices(Relation → Invoices DB)
  - 선택(미존재) 속성: 발급자명/발급자 담당자/발급자 이메일/발급자 연락처/발급자 주소/사업자번호/고객 담당자/고객 이메일/고객 연락처/비고 — 추가 시 자동 반영
- [ ] Items DB에 품목 입력 후 `항목`(Relation)으로 연결하여 조회 검증
  - 매퍼는 `notion.databases.query()` + relation 필터로 Items DB를 조회 (페이지 본문 테이블 블록이 아님)
- [ ] 실제 데이터로 견적서 뷰어 최종 검토 (레이아웃, 금액 계산, 날짜 포맷)

#### 운영 모니터링 준비
- [ ] Vercel Analytics 활성화 (페이지 로드 시간 모니터링)
- [ ] `console.error` 로그가 Vercel 함수 로그에서 확인 가능한지 검증
- [ ] `README.md` 업데이트 (로컬 개발 환경 설정 방법, 노션 DB 구조 안내)

**완료 기준 (Definition of Done):**
- [ ] 프로덕션 URL에서 실제 노션 데이터로 견적서 목록이 렌더링된다
- [ ] 견적서 뷰어 URL을 브라우저에서 열면 2초 이내에 견적서가 표시된다
- [ ] PDF 다운로드가 프로덕션 환경에서 정상 동작한다
- [ ] 존재하지 않는 ID 접근 시 404 페이지가 프로덕션에서도 표시된다

**리스크:**

| 리스크 | 확률 | 영향도 | 대응 방안 |
|--------|------|--------|----------|
| 노션 속성명이 매퍼의 한국어 키와 불일치 | 중 | 높음 | 배포 전 로컬에서 실제 노션 DB 연동 테스트 필수 |
| Notion API Rate Limit (초당 3회) | 낮음 | 중 | 목록 페이지 `cache: "no-store"` → 필요 시 ISR(`revalidate`)로 전환 |
| Vercel 서버리스 함수 콜드 스타트 지연 | 중 | 낮음 | Vercel Edge Functions 전환 검토 (이후 최적화) |

---

### Phase 5: 마무리 및 기술 부채 정리 — 2026-06-18 ~ 2026-06-19

**목표:** 코드 품질 개선, 잠재적 버그 수정, 문서화

#### 코드 품질
- [ ] `npm run lint` 오류 전수 해결
- [ ] `invoice-mapper.ts`의 `as` 타입 단언 부분을 Zod 파싱으로 교체 검토
  - `notionInvoicePropertySchema.safeParse(page.properties)` 활용
- [ ] `invoice-mapper.ts`의 `totalAmount: 0` (목록에서 금액 생략) 주석 보강
- [ ] 중복 날짜 포맷 함수 (`formatDate`) 공통 유틸리티로 추출 (`lib/format.ts`)
- [ ] 중복 금액 포맷 함수 (`formatKRW`, `formatNumber`) 공통 유틸리티로 추출

#### 문서화
- [ ] `README.md` 최종 작성
  - 프로젝트 개요 및 스크린샷
  - 노션 데이터베이스 설정 가이드 (속성명, 테이블 블록 형식)
  - 로컬 개발 환경 설정 방법 (`.env.local` 예시)
  - Vercel 배포 방법
- [ ] 코드 주석 누락 부분 보완

**완료 기준 (Definition of Done):**
- [ ] `npm run lint` 경고 없이 통과
- [ ] `README.md`만 읽고도 새 개발자가 로컬 환경을 설정하고 실행할 수 있다

---

## 기술 아키텍처 결정사항

### 기술 스택

| 레이어 | 기술 | 선택 이유 |
|--------|------|----------|
| 프레임워크 | Next.js 16 App Router | 서버 컴포넌트로 Notion API 토큰 보호, Route Handler로 API 프록시 |
| UI 라이브러리 | React 19 + shadcn/ui (radix-nova) | 접근성 보장된 헤드리스 컴포넌트, 빠른 UI 구성 |
| 스타일링 | Tailwind CSS v4 | 유틸리티 우선 CSS, `print:hidden` 등 인쇄 유틸리티 내장 |
| 타입 검증 | TypeScript 5 strict + Zod | Notion API 응답의 런타임 타입 안전성 확보 |
| 상태 관리 | Zustand | 견적서 캐시, PDF 로딩 상태 관리 (경량) |
| Notion 연동 | @notionhq/client 5.x | 공식 SDK, TypeScript 타입 내장 |
| PDF 생성 | window.print() + @media print CSS | 추가 번들 크기 없이 브라우저 인쇄 기능 활용 |
| 패키지 관리 | npm | 프로젝트 기본 설정 |
| 배포 | Vercel | Next.js 공식 배포 플랫폼, 환경 변수 관리 용이 |

### 주요 아키텍처 결정 (ADR)

1. **Notion API 토큰을 서버 사이드에서만 사용**
   클라이언트 페이지에서 직접 Notion API를 호출하지 않고, Next.js Route Handler(`app/api/invoices/`)를 프록시로 두어 API 토큰을 브라우저에 노출하지 않는다. 서버 컴포넌트에서 Route Handler를 내부 fetch로 호출하는 방식을 채택했다.

2. **PDF 생성 방식: window.print() 우선 채택**
   `html2canvas + jsPDF`는 캔버스 렌더링 품질 이슈와 번들 크기(약 500KB) 증가 문제가 있다. `window.print()`는 브라우저 네이티브 렌더링을 그대로 사용하므로 텍스트 품질이 높고 번들 크기에 영향 없다. `@media print` CSS로 레이아웃을 제어한다. 품질이 불충분할 경우 `html2canvas + jsPDF`로 전환한다.

3. **견적서 목록에서 totalAmount = 0으로 처리**
   견적서 목록 조회 시 `notion.databases.query()`만 호출하고 각 페이지의 블록(품목 테이블)을 별도 조회하지 않는다. 페이지당 추가 API 호출을 피해 목록 로드 속도를 유지한다. 목록 카드에서는 `totalAmount = 0`이면 "-"로 표시한다.

4. **Notion 테이블 블록으로 품목 데이터 저장**
   Notion 페이지 속성(Properties)에는 복잡한 구조화 데이터를 저장하기 어려우므로, 품목 목록은 페이지 본문의 테이블 블록(Table Block)에 저장한다. `notion.blocks.children.list()`로 조회하며 첫 번째 행은 헤더로 건너뛴다.

5. **서버 컴포넌트 + Suspense 패턴**
   목록/뷰어 페이지 모두 서버 컴포넌트로 구현하여 초기 HTML에 데이터를 포함시킨다. `React.Suspense`와 `Skeleton` 컴포넌트를 조합하여 로딩 중 UI를 제공한다.

---

## 전체 일정 요약

```
2026-06-03  2026-06-05  2026-06-09  2026-06-13  2026-06-17  2026-06-19
    |            |            |            |            |            |
    [=== Phase 1 ===]
                 [======= Phase 2 =========]
                                           [== Phase 3 ==]
                                                        [== Phase 4 ==]
                                                                     [P5]
```

| Phase | 기간 | 주요 목표 | 상태 |
|-------|------|-----------|------|
| Phase 1: 기반 설정 | 2026-06-03 ~ 06-05 | 프로젝트 초기화, 도메인 모델, Notion 연동 레이어 | 완료 |
| Phase 2: API + 핵심 UI | 2026-06-05 ~ 06-09 | Route Handler, 뷰어/목록 UI 컴포넌트, 페이지 | 완료 |
| Phase 3: PDF + 오류 처리 | 2026-06-10 ~ 06-13 | @media print 완성, 오류 처리 강화 | 진행 예정 |
| Phase 4: 배포 | 2026-06-14 ~ 06-17 | Vercel 배포, 노션 실제 연동 검증 | 진행 예정 |
| Phase 5: 마무리 | 2026-06-18 ~ 06-19 | 코드 정리, 문서화 | 진행 예정 |

---

## 팀 구성 및 역할

| 역할 | 담당 Phase | 주요 책임 |
|------|------------|----------|
| 풀스택 개발자 | Phase 1 ~ 5 전체 | Next.js 개발, Notion API 연동, UI 구현, 배포 |

> 현재 1인 개발 체제로 추정. 일정에 20% 버퍼를 포함하여 수립됨.

---

## 리스크 관리

### 주요 리스크 목록

| # | 리스크 | 확률 | 영향 | 우선순위 | 대응 전략 |
|---|--------|------|------|----------|----------|
| 1 | 노션 속성명(한국어)이 실제 DB와 불일치 | 중 | 높음 | 높음 | Phase 4 시작 전 실제 DB로 로컬 연동 테스트 필수 수행 |
| 2 | `@media print` 브라우저 간 렌더링 차이 | 중 | 중 | 중 | Chrome 우선, Safari/Firefox 순차 검증 |
| 3 | 긴 품목 목록 PDF 페이지 분할 레이아웃 깨짐 | 중 | 중 | 중 | `break-inside: avoid`, `page-break-inside: avoid` CSS 적용 |
| 4 | Notion API Rate Limit 초과 (요청 3회/초) | 낮음 | 중 | 낮음 | 목록 페이지 ISR 도입 또는 서버 사이드 캐시 추가 |
| 5 | Vercel 서버리스 콜드 스타트 지연 | 중 | 낮음 | 낮음 | 초기 배포 후 측정, 필요 시 Edge Runtime 전환 검토 |
| 6 | 노션 테이블 블록 열 순서 불일치 | 낮음 | 높음 | 중 | `invoice-mapper.ts`의 열 순서 주석 문서화, 노션 DB 가이드 제공 |

---

## 잔여 작업 체크리스트 (Phase 3 ~ 5)

현재(2026-06-03) 기준으로 남은 작업만 별도 정리합니다.

### 즉시 착수 가능 (Phase 3)
- [ ] `app/globals.css` `@media print` 스타일 작성
  - A4 페이지 크기 및 여백 설정
  - 헤더/푸터/네비게이션 인쇄 숨김
  - 품목 테이블 페이지 분할 방지
- [ ] `app/not-found.tsx` 견적서 맥락 안내 메시지 추가
- [ ] `app/error.tsx` 재시도 버튼 및 오류 유형별 메시지 추가
- [ ] 인쇄 미리보기 UI 테스트 (Chrome DevTools > More Tools > Rendering > Print)

### 배포 준비 (Phase 4)
- [ ] Vercel 프로젝트 생성 및 환경 변수 입력
- [ ] 실제 노션 DB 속성명과 `invoice-mapper.ts` 키 일치 여부 검증
- [ ] 프로덕션 URL E2E 검증 (목록 → 뷰어 → PDF)

### 마무리 (Phase 5)
- [ ] `lib/format.ts` 공통 포맷 유틸리티 추출 (날짜, 금액)
- [ ] `README.md` 완성 (노션 DB 구조 가이드 포함)
- [ ] `npm run lint` 전체 통과

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0 | 2026-06-03 | 최초 작성. PRD 기반 5단계 로드맵 수립. Phase 1~2 완료 상태 반영 | - |
