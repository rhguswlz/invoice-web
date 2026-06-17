# 🗺️ 노션 기반 견적서 웹 서비스 개발 로드맵

> 마지막 업데이트: 2026-06-18 | 버전: 2.0

---

## 📋 프로젝트 개요

### 비전
노션 데이터베이스에 입력한 견적서를 클라이언트가 웹 브라우저에서 즉시 확인하고 PDF로 다운로드할 수 있는 최소한의 견적서 공유 서비스

### 목표
- 발급자가 별도의 견적서 소프트웨어 없이 노션만으로 견적서를 발행하고 공유할 수 있도록 한다
- 클라이언트가 설치 없이 링크 하나로 견적서를 열람하고 PDF로 저장할 수 있도록 한다
- Notion API ↔ Next.js Route Handler ↔ 뷰어 UI의 서버/클라이언트 경계를 명확히 유지한다
- 관리자(발급자)가 별도 로그인 후 견적서 관리 대시보드에서 발행/공유/다운로드를 한 번에 처리할 수 있도록 한다

### 성공 지표 (KPI)

| 지표 | 현재값 | 목표값 | 측정 방법 |
|------|--------|--------|----------|
| 견적서 뷰어 페이지 로드 시간 | - | 2초 이내 | Vercel Analytics |
| PDF 다운로드 성공률 | - | 99% 이상 | 브라우저 print 완료 여부 |
| Notion API 오류 응답률 | - | 1% 미만 | 서버 로그 모니터링 |
| 관리자 대시보드 링크 복사 성공률 | - | 99% 이상 | Clipboard API 성공 여부 |
| 빌드 성공 여부 | - | 100% | Vercel CI/CD 파이프라인 |

---

## 🎯 MVP 범위 (Phase 1~3 — 완료)

### 핵심 가설
노션을 이미 사용하는 프리랜서/소규모 사업자는 별도 견적서 도구 없이, 노션 데이터베이스 + 공유 링크만으로도 견적서 발행/공유 워크플로우를 완성할 수 있다.

### MVP 포함 기능 (모두 완료)
- [x] F010: Notion API 연동 설정 (환경 변수 기반 클라이언트 초기화)
- [x] F011: 견적서 데이터 매핑 (Notion 페이지 속성 → Invoice 도메인 모델)
- [x] F001: 견적서 조회 (Route Handler + 서버 컴포넌트)
- [x] F002: 견적서 항목 표시 (뷰어 UI 컴포넌트)
- [x] F004: 견적서 목록 조회 (목록 페이지)
- [x] F003: PDF 다운로드 (`window.print()` + `@media print` CSS)
- [x] F012: 오류 처리 (404/500 핸들링, 오류 유형별 안내, 재시도 버튼)
- [x] `@media print` 스타일 완성 (A4, 헤더/푸터 숨김, 페이지 분할 방지)
- [x] 환경 변수 누락 시 런타임 안내 UI

### MVP 제외 기능 (고도화 단계 개발)
- 관리자 인증/로그인 (Phase 4)
- 관리자 대시보드 — 견적서 목록 관리 UI (Phase 4)
- 클라이언트 공유 링크 복사 기능 (Phase 4)
- 관리자 대시보드에서 PDF 다운로드 (Phase 4)
- Vercel 배포 및 운영 환경 최적화 (Phase 4~5)
- 견적서 승인/거절 워크플로우 (Post-MVP)
- 이메일 자동 발송 (Post-MVP)
- 다국어 지원 (Post-MVP)
- 커스텀 템플릿 (Post-MVP)
- 실시간 알림 (Post-MVP)

---

## 📊 현재 구현 상태 (2026-06-18 기준)

| 파일/모듈 | 구현 내용 | 상태 |
|-----------|-----------|------|
| `lib/notion.ts` | Notion 클라이언트 초기화, 환경 변수 검증 | ✅ 완료 |
| `lib/invoice-mapper.ts` | Notion Page → Invoice/InvoiceListItem 매핑 | ✅ 완료 |
| `lib/validations.ts` | Zod 스키마 (Invoice, Issuer, Client, InvoiceItem) | ✅ 완료 |
| `types/index.ts` | 도메인 타입 정의 (Invoice, Issuer, Client 등) | ✅ 완료 |
| `app/api/invoices/route.ts` | GET /api/invoices (목록 조회) | ✅ 완료 |
| `app/api/invoices/[id]/route.ts` | GET /api/invoices/[id] (단건 조회) | ✅ 완료 |
| `app/invoices/page.tsx` | 견적서 목록 페이지 (F004) | ✅ 완료 |
| `app/invoices/[id]/page.tsx` | 견적서 뷰어 페이지 (F001) | ✅ 완료 |
| `app/page.tsx` | 홈 랜딩 페이지 (서비스 소개) | ✅ 완료 |
| `app/not-found.tsx` | 커스텀 404 페이지 | ✅ 완료 |
| `app/error.tsx` | 커스텀 오류 페이지 (재시도 버튼, 오류 유형별 안내) | ✅ 완료 |
| `app/globals.css` | `@media print` 스타일 (A4, 헤더 숨김, 분할 방지) | ✅ 완료 |
| `components/invoice/invoice-viewer.tsx` | 뷰어 + PDF 다운로드 버튼 (F002, F003) | ✅ 완료 |
| `components/invoice/invoice-header.tsx` | 견적서 헤더 (번호, 날짜, 발급자/고객 정보) | ✅ 완료 |
| `components/invoice/invoice-items-table.tsx` | 품목 테이블 | ✅ 완료 |
| `components/invoice/invoice-summary.tsx` | 금액 합계 + 비고 | ✅ 완료 |
| `components/invoice/invoice-card.tsx` | 목록 카드 컴포넌트 | ✅ 완료 |
| `store/invoice-store.ts` | Zustand 스토어 (캐시, PDF 로딩 상태) | ✅ 완료 |
| `lib/constants.ts` | SITE_CONFIG, NAV_ITEMS | ✅ 완료 |

---

## 📅 개발 단계

### Phase 1: 기반 설정 및 도메인 모델링 — 2026-06-03 ~ 2026-06-05 ✅ 완료

**목표:** 프로젝트 초기화, 기술 스택 설치, Notion API 연동을 위한 서버 레이어 구축

#### 🔧 인프라 & 설정
- [x] Next.js 16 + React 19 + TypeScript 5 프로젝트 초기화
- [x] Tailwind CSS v4 + shadcn/ui (radix-nova 스타일) 설정
- [x] Zustand, React Hook Form, Zod 패키지 설치
- [x] `@notionhq/client` 설치 및 `lib/notion.ts` 초기화 (F010)
- [x] `.env.example` 파일 작성

#### 🗂️ 도메인 모델
- [x] `types/index.ts`: 도메인 타입 정의 (Invoice, Issuer, Client, InvoiceItem, InvoiceListItem, ApiResponse)
- [x] `lib/validations.ts`: Zod 스키마 정의

#### 🔗 Notion 데이터 레이어
- [x] `lib/notion.ts`: 환경 변수 누락 시 조기 오류 발생 로직 (F010)
- [x] `lib/invoice-mapper.ts`: `mapPageToInvoiceListItem()` 구현 (F011)
- [x] `lib/invoice-mapper.ts`: `mapPageToInvoice()` 구현 (F011)

**완료 기준 (Definition of Done):**
- [x] `npm run build`가 오류 없이 통과된다
- [x] Notion 환경 변수 없이 실행 시 명확한 오류 메시지가 출력된다
- [x] TypeScript strict 모드에서 타입 오류가 없다

---

### Phase 2: API 레이어 및 핵심 UI 구현 — 2026-06-05 ~ 2026-06-09 ✅ 완료

**목표:** Next.js Route Handler로 Notion API 프록시 구현 및 견적서 뷰어/목록 UI 구성

#### 🔧 백엔드 — Route Handlers
- [x] `app/api/invoices/route.ts`: `GET /api/invoices` 구현 (F004)
- [x] `app/api/invoices/[id]/route.ts`: `GET /api/invoices/[id]` 구현 (F001, F011, F012)

#### 🔧 상태 관리
- [x] `store/invoice-store.ts`: Zustand 스토어 (견적서 캐시, PDF 로딩 상태)

#### 🎨 프론트엔드 — UI 컴포넌트
- [x] `components/invoice/invoice-header.tsx` (F002)
- [x] `components/invoice/invoice-items-table.tsx` (F002)
- [x] `components/invoice/invoice-summary.tsx` (F002)
- [x] `components/invoice/invoice-viewer.tsx` (F002, F003)
- [x] `components/invoice/invoice-card.tsx` (F004)
- [x] `components/layout/header.tsx`, `footer.tsx`

#### 🎨 프론트엔드 — 페이지
- [x] `app/page.tsx`: 홈 랜딩 페이지
- [x] `app/invoices/page.tsx`: 견적서 목록 페이지 (F004)
- [x] `app/invoices/[id]/page.tsx`: 견적서 뷰어 페이지 (F001)

**완료 기준 (Definition of Done):**
- [x] `GET /api/invoices`가 `InvoiceListItem[]` 배열을 정상 반환한다
- [x] `GET /api/invoices/[id]`가 완전한 `Invoice` 객체를 정상 반환한다
- [x] 존재하지 않는 ID 요청 시 HTTP 404와 오류 메시지를 반환한다
- [x] 견적서 목록 페이지에서 카드 UI가 렌더링된다
- [x] 견적서 뷰어 페이지에서 헤더/품목/합계가 모두 표시된다

---

### Phase 3: PDF 출력 완성 및 오류 처리 강화 — 2026-06-10 ~ 2026-06-13 ✅ 완료

**목표:** PDF 인쇄 레이아웃 완성, F012 오류 처리 강화, 엣지 케이스 대응

#### 🔧 PDF 다운로드 완성 (F003)
- [x] `invoice-viewer.tsx`에 `window.print()` 기반 PDF 다운로드 버튼 구현
- [x] `app/globals.css`에 `@media print` 스타일 완성
  - A4 크기 및 여백 설정 (`@page { size: A4; margin: 1cm }`)
  - 헤더/푸터 숨김 처리
  - 품목 테이블 페이지 분할 방지 (`break-inside: avoid`)
  - 배경색 인쇄 강제 적용 (`-webkit-print-color-adjust: exact`)

#### 🔧 오류 처리 강화 (F012)
- [x] `app/not-found.tsx`: 커스텀 404 페이지 (견적서 맥락 안내, 목록 복귀 버튼)
- [x] `app/error.tsx`: 커스텀 500 오류 페이지 (재시도 버튼, 오류 유형별 메시지)
- [x] Notion API 인증 오류(401) 사용자 친화적 메시지 처리

**완료 기준 (Definition of Done):**
- [x] 인쇄 다이얼로그에서 "PDF로 저장"을 선택하면 올바른 레이아웃의 PDF가 생성된다
- [x] 존재하지 않는 견적서 ID 접근 시 커스텀 404 페이지가 표시된다
- [x] `app/error.tsx`에서 재시도 버튼이 `router.refresh()` + `reset()`으로 동작한다
- [x] `npm run build`가 오류 없이 통과된다

---

### Phase 4: 관리자 기능 고도화 — 2026-06-18 ~ 2026-07-04

**목표:** 발급자(관리자) 전용 인증 및 대시보드 구현. 견적서 목록 조회, 공유 링크 복사, PDF 다운로드를 한 곳에서 처리할 수 있도록 한다.

> **전제 조건:** Phase 3 완료 (✅ 충족)

---

#### 4-1. 관리자 인증 (Auth) — 예상 4d

**설계 결정 — 인증 방식 선택:**

| 방식 | 장점 | 단점 | 권장 시나리오 |
|------|------|------|--------------|
| **환경 변수 기반 패스워드 인증** | 구현 단순, 외부 의존성 없음 | 비밀번호 단일 계정, 탈취 위험 | 1인 운영, 빠른 출시 필요 시 |
| **NextAuth.js v5 + Google OAuth** | 구글 계정 재사용, 다중 계정 가능 | 외부 서비스 의존, 설정 복잡도 증가 | 다수 관리자, 장기 운영 |
| **NextAuth.js v5 + GitHub OAuth** | 개발자 친화적, GitHub 계정 재사용 | GitHub 계정 필수 | 개발자 개인 프로젝트 |

> **권장:** **NextAuth.js v5 + Google OAuth** (이메일 기반으로 발급자 본인 계정과 연계 가능, 확장성 확보)
> 단, 빠른 검증이 목적이라면 환경 변수 패스워드 방식으로 먼저 구현 후 전환 가능.

#### 🔧 백엔드 — 인증 레이어
- [x] `lib/auth.ts`: Web Crypto API 기반 HMAC-SHA256 토큰 생성/검증 — 완료
  - `generateSessionToken(password, secret)` 함수 구현
  - `verifySessionToken(token, password, secret)` 함수 구현
  - Edge Runtime 호환성 확보
- [x] `app/api/admin/auth/login/route.ts`: 로그인 API 구현 — 완료
  - POST 요청으로 비밀번호 검증
  - 성공 시 admin_session 쿠키 설정 (httpOnly, 24h)
- [x] `app/api/admin/auth/logout/route.ts`: 로그아웃 API 구현 — 완료
  - 쿠키 삭제
- [x] `middleware.ts`: `/admin` 경로 전체에 인증 미들웨어 적용 — 예상: 0.5d
  - 미인증 접근 시 `/admin/login`으로 리디렉션
  - 인증 완료 시 `/admin`으로 리디렉션
- [x] `app/api/admin/invoices/route.ts`: 관리자 전용 목록 API (인증 검사 포함) — 예상: 1d
  - 세션 쿠키 검증
  - 미인증 요청에 HTTP 401 응답

#### 🎨 프론트엔드 — 로그인 페이지
- [x] `app/admin/login/page.tsx`: 로그인 페이지 — 예상: 1d
  - 비밀번호 입력 필드
  - 비인증 접근 시 안내 메시지 표시

**완료 기준:**
- [x] `/admin` 경로에 미인증 접근 시 `/admin/login`으로 리디렉션된다
- [x] 올바른 비밀번호로 로그인 후 `/admin`으로 이동된다
- [x] 잘못된 비밀번호로 로그인 시 접근이 거부된다

**선택된 구현 방식:**
- 환경변수 기반 단일 비밀번호 인증 (NextAuth.js 대신 Web Crypto API 선택)
- 장점: 구현 단순, 외부 의존성 없음, 빠른 개발
- 확장성: 향후 OAuth 전환 가능

---

#### 4-2. 관리자 레이아웃 및 대시보드 — 예상 3d

#### 🔗 인프라 — 레이아웃
- [x] `app/admin/(dashboard)/layout.tsx`: 관리자 전용 레이아웃 — 예상: 1d
  - 사이드바 네비게이션 (shadcn/ui 컴포넌트 활용)
  - 로그아웃 버튼
  - 기존 공개 레이아웃(`app/layout.tsx`)과 분리

#### 🎨 프론트엔드 — 대시보드 페이지
- [x] `app/admin/(dashboard)/page.tsx`: 관리자 대시보드 홈 — 예상: 1d
  - 견적서 통계 요약 카드 (전체 건수, 상태별 집계: active/expired/pending)
  - 최근 견적서 5건 미리보기
- [x] `app/admin/(dashboard)/invoices/page.tsx`: 관리자 견적서 목록 페이지 — 예상: 1d
  - `GET /api/admin/invoices` 호출 (서버 컴포넌트)
  - 견적서 번호, 고객명, 발행일, 상태 배지, 총금액 표시
  - 상태 필터 (전체 / active / expired / pending)
  - 발행일 내림차순 정렬

#### 🎨 UI 컴포넌트
- [x] `components/admin/admin-invoice-table.tsx`: 관리자 견적서 테이블 컴포넌트 — 예상: 1d
  - HTML table 활용
  - 각 행에 상태 배지(`Badge`), 링크 복사 버튼, PDF 다운로드 버튼 배치
  - 뷰어 페이지 이동 링크

**완료 기준:**
- [x] 로그인한 관리자가 `/admin/invoices`에서 전체 견적서 목록을 테이블로 조회할 수 있다
- [x] 상태 배지(active/expired/pending)가 각 행에 표시된다
- [x] 각 견적서 행에서 뷰어 페이지로 이동할 수 있다

---

#### 4-3. 공유 링크 복사 기능 — 예상 1.5d

#### 🎨 프론트엔드 — 클립보드 복사
- [x] `components/admin/copy-link-button.tsx`: 링크 복사 버튼 컴포넌트 — 예상: 1d
  - `navigator.clipboard.writeText(url)` Clipboard API 사용
  - 복사 성공 시 아이콘이 체크마크로 1.5초간 전환 후 원래 아이콘으로 복귀
  - Clipboard API 미지원 브라우저 폴백: `document.execCommand('copy')`
  - shadcn/ui `Button` + Lucide `Copy` / `Check` 아이콘 조합
- [x] `components/admin/copy-link-button.tsx`에 Sonner `Toast` 연동 — 예상: 0.5d
  - 복사 완료: "링크가 복사되었습니다" 토스트 표시
  - 복사 실패: "링크 복사에 실패했습니다" 토스트 표시

> **공유 링크 형식:** `${NEXT_PUBLIC_BASE_URL}/invoices/{notionPageId}`
> 클라이언트는 인증 없이 뷰어 페이지에 직접 접근 가능 (기존 F001 동작 유지)

**완료 기준:**
- [x] 관리자 테이블의 각 견적서 행에서 복사 버튼 클릭 시 URL이 클립보드에 복사된다
- [x] 복사 완료 토스트 안내가 표시된다
- [x] 복사된 URL로 브라우저 새 탭에서 뷰어 페이지에 접근할 수 있다

**리스크:**

| 리스크 | 확률 | 영향도 | 대응 방안 |
|--------|------|--------|----------|
| HTTPS 미적용 환경에서 Clipboard API 차단 | 중 | 중 | 로컬 개발은 `localhost` 예외 적용됨, 프로덕션은 Vercel HTTPS 자동 제공 |
| 구형 브라우저 Clipboard API 미지원 | 낮음 | 낮음 | `execCommand('copy')` 폴백 처리 |

---

#### 4-4. 관리자 대시보드에서 PDF 다운로드 — 예상 2d

**설계 결정 — PDF 생성 방식:**

| 방식 | 장점 | 단점 | 권장 시나리오 |
|------|------|------|--------------|
| **window.print() 트리거 (현재 방식 확장)** | 추가 패키지 없음, 브라우저 네이티브 품질 | 새 탭 열기 필요, 팝업 차단 가능성 | 빠른 구현, 기존 스타일 재사용 |
| **서버 사이드 PDF (Puppeteer/Playwright)** | 헤드리스 렌더링, 서버에서 파일 직접 생성 | Vercel 서버리스 환경 실행 제약, 번들 크기 증가 | 대량 자동화, 이메일 첨부 필요 시 |
| **html2canvas + jsPDF (클라이언트)** | 설치된 패키지 재활용 가능 | 렌더링 품질 이슈, 번들 500KB 증가 | 레거시 지원 필요 시 |

> **권장:** **window.print() 트리거 방식** 우선 채택. 관리자 테이블에서 PDF 버튼 클릭 시 해당 견적서 뷰어 페이지를 새 탭으로 열고 `window.print()`를 자동 트리거하는 방식. 추후 자동화 요구 발생 시 Puppeteer 서버 사이드 방식으로 전환.

#### 🎨 프론트엔드 — PDF 다운로드 버튼
- [x] `components/admin/admin-pdf-button.tsx`: 관리자 PDF 다운로드 버튼 컴포넌트 — 예상: 1d
  - 클릭 시 `/invoices/{id}?print=1` URL을 새 탭으로 열기
  - `print=1` 쿼리 파라미터를 뷰어 페이지에서 감지하여 `window.print()` 자동 실행
  - shadcn/ui `Button` + Lucide `FileDown` 아이콘 사용

#### 🔧 백엔드 — 뷰어 페이지 자동 인쇄 지원
- [x] `app/invoices/[id]/page.tsx`에 `searchParams.print` 감지 로직 추가 — 예상: 0.5d
  - `?print=1` 파라미터가 있을 경우 뷰어에 자동 인쇄 플래그 전달
- [x] `components/invoice/invoice-viewer.tsx`에 자동 인쇄 `useEffect` 추가 — 예상: 0.5d
  - `autoPrint` prop이 `true`면 컴포넌트 마운트 후 `window.print()` 자동 실행

#### 🧪 테스트
- [ ] Playwright MCP로 관리자 PDF 다운로드 플로우 E2E 검증
  - `mcp__playwright__browser_navigate`로 `/admin/invoices` 접근
  - PDF 버튼 클릭 후 새 탭 오픈 및 `print=1` 파라미터 확인
  - `mcp__playwright__browser_snapshot`으로 뷰어 페이지 렌더링 확인

**완료 기준:**
- [x] 관리자 테이블에서 PDF 버튼 클릭 시 해당 견적서 뷰어 페이지가 새 탭으로 열린다
- [x] `?print=1` 파라미터가 있을 때 뷰어 페이지에서 인쇄 다이얼로그가 자동으로 열린다
- [x] 인쇄 레이아웃이 기존 뷰어 PDF 출력과 동일하다

**리스크:**

| 리스크 | 확률 | 영향도 | 대응 방안 |
|--------|------|--------|----------|
| 브라우저 팝업 차단으로 새 탭 오픈 실패 | 중 | 중 | 사용자 직접 클릭 이벤트 내에서 `window.open()` 호출 (브라우저 팝업 차단 예외 적용) |
| `window.print()` 자동 실행 타이밍 문제 | 낮음 | 중 | `useEffect` 내 `setTimeout(200ms)` 딜레이로 렌더링 완료 후 실행 보장 |

---

#### 4-5. Phase 4 전체 🧪 E2E 테스트
- [x] 관리자 인증 플로우 E2E 검증 — 완료
  - 미인증 접근 시 `/admin/login`으로 리디렉션 확인
  - 로그인 후 `/admin/invoices` 접근 및 테이블 렌더링 확인
- [x] 링크 복사 플로우 E2E 검증 — 완료
  - 복사 버튼 렌더링 확인
  - 복사 버튼 클릭 후 토스트 표시 확인
- [x] 통합 플로우 검증 — 완료
  - 로그인 → 목록 조회 → 링크 복사 → PDF 다운로드 전체 플로우 작동 확인

**Phase 4 마일스톤 산출물:**
- 관리자 로그인 페이지 (`/admin/login`)
- 관리자 레이아웃 (`/admin/(dashboard)/layout.tsx`)
- 관리자 대시보드 (`/admin`)
- 관리자 견적서 목록 페이지 (`/admin/invoices`)
- 공유 링크 복사 기능 (Toast 피드백 포함)
- 관리자 PDF 다운로드 버튼
- Web Crypto API 기반 환경변수 패스워드 인증

---

### Phase 5: 배포 및 운영 최적화 — 2026-07-07 ~ 2026-07-14

**목표:** Vercel 프로덕션 배포, 운영 모니터링 설정, 코드 품질 개선 및 문서화 완성

> **전제 조건:** Phase 4 완료

---

#### 5-1. Vercel 배포 — 예상 2d

#### 🔗 인프라
- [ ] Vercel 프로젝트 생성 및 GitHub 저장소 연결 — 예상: 0.5d
- [ ] Vercel 환경 변수 설정 — 예상: 0.5d
  - `NOTION_API_TOKEN` (Production/Preview/Development)
  - `NOTION_DATABASE_ID` (Production/Preview/Development)
  - `NEXT_PUBLIC_BASE_URL` (Production: 실제 도메인)
  - `AUTH_SECRET` (Production: `openssl rand -base64 32` 생성)
  - `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` (Production)
  - `AUTH_ALLOWED_EMAILS` (허용 이메일 쉼표 구분 목록)
- [ ] Vercel 첫 번째 배포 실행 및 빌드 로그 확인 — 예상: 0.5d
- [ ] 배포된 URL에서 견적서 목록, 뷰어, 관리자 플로우 E2E 확인 — 예상: 0.5d

#### 5-2. Notion 실제 데이터 연동 검증 — 예상 1d
- [ ] 프로덕션 노션 데이터베이스 속성명이 매퍼와 일치하는지 확인
  - Invoices DB: 견적서 번호(Title), 발행일(Date), 유효기간(Date), 상태(Status), 클라이언트명명(Rich Text), 총금액(Number), 항목(Relation)
  - Items DB: 항목명(Title), 수량(Number), 단가(Number), 금액(Formula), Invoices(Relation)
- [ ] 실제 데이터로 견적서 목록 → 뷰어 → PDF 전체 플로우 검증

#### 5-3. 운영 모니터링 준비 — 예상 1d
- [ ] Vercel Analytics 활성화 (페이지 로드 시간 모니터링)
- [ ] `console.error` 로그가 Vercel 함수 로그에서 확인 가능한지 검증
- [ ] Notion API Rate Limit 대응: 견적서 목록 페이지 ISR 적용 검토
  - `revalidate = 60` (60초 캐시) 설정으로 API 호출 빈도 감소

**완료 기준:**
- [ ] 프로덕션 URL에서 실제 노션 데이터로 견적서 목록이 렌더링된다
- [ ] 관리자 로그인 후 대시보드에서 견적서를 관리할 수 있다
- [ ] 견적서 뷰어 URL을 브라우저에서 열면 2초 이내에 견적서가 표시된다
- [ ] PDF 다운로드가 프로덕션 환경에서 정상 동작한다

**리스크:**

| 리스크 | 확률 | 영향도 | 대응 방안 |
|--------|------|--------|----------|
| 노션 속성명이 매퍼의 한국어 키와 불일치 | 중 | 높음 | 배포 전 로컬에서 실제 노션 DB 연동 테스트 필수 |
| Notion API Rate Limit (초당 3회) | 낮음 | 중 | ISR `revalidate` 도입으로 API 호출 횟수 감소 |
| Vercel 서버리스 함수 콜드 스타트 지연 | 중 | 낮음 | 초기 배포 후 측정, 필요 시 Edge Runtime 전환 검토 |
| NextAuth.js OAuth Redirect URI 불일치 | 중 | 높음 | Google 콘솔에 프로덕션 URL Redirect URI 사전 등록 필수 |

---

#### 5-4. 코드 품질 개선 — 예상 1.5d
- [ ] `npm run lint` 오류 전수 해결
- [ ] `lib/format.ts` 공통 포맷 유틸리티 추출 (날짜, 금액 중복 함수 정리)
- [ ] `invoice-mapper.ts`의 `as` 타입 단언 → Zod `safeParse`로 교체 검토
- [ ] 코드 주석 누락 부분 보완

#### 5-5. 문서화 완성 — 예상 1d
- [ ] `README.md` 최종 작성
  - 프로젝트 개요 및 스크린샷
  - 노션 데이터베이스 설정 가이드 (속성명, Relation 연결 방법)
  - 로컬 개발 환경 설정 방법 (`.env.local` 예시 포함)
  - 관리자 인증 설정 방법 (Google OAuth 콘솔 설정 가이드)
  - Vercel 배포 방법

**완료 기준:**
- [ ] `npm run lint` 경고 없이 통과된다
- [ ] `README.md`만 읽고도 새 개발자가 로컬 환경을 설정하고 실행할 수 있다
- [ ] 관리자 Google OAuth 설정 가이드가 README에 포함된다

---

## 🏗️ 기술 아키텍처 결정사항

### 기술 스택

| 레이어 | 기술 | 선택 이유 |
|--------|------|----------|
| 프레임워크 | Next.js 16 App Router | 서버 컴포넌트로 Notion API 토큰 보호, Route Handler로 API 프록시 |
| UI 라이브러리 | React 19 + shadcn/ui (radix-nova) | 접근성 보장된 헤드리스 컴포넌트, 빠른 UI 구성 |
| 스타일링 | Tailwind CSS v4 | 유틸리티 우선 CSS, `print:hidden` 등 인쇄 유틸리티 내장 |
| 타입 검증 | TypeScript 5 strict + Zod | Notion API 응답의 런타임 타입 안전성 확보 |
| 상태 관리 | Zustand | 견적서 캐시, PDF 로딩 상태 관리 (경량) |
| 인증 | NextAuth.js v5 (auth.js) + Google OAuth | 서버리스 환경 최적화 JWT 세션, 구글 계정 재사용 |
| Notion 연동 | @notionhq/client 5.x | 공식 SDK, TypeScript 타입 내장 |
| PDF 생성 | window.print() + @media print CSS | 추가 번들 크기 없이 브라우저 인쇄 기능 활용 |
| 패키지 관리 | npm | 프로젝트 기본 설정 |
| 배포 | Vercel | Next.js 공식 배포 플랫폼, 환경 변수 관리 용이 |

### 주요 아키텍처 결정 (ADR)

1. **Notion API 토큰을 서버 사이드에서만 사용**
   클라이언트 페이지에서 직접 Notion API를 호출하지 않고, Next.js Route Handler(`app/api/invoices/`)를 프록시로 두어 API 토큰을 브라우저에 노출하지 않는다.

2. **PDF 생성 방식: window.print() 우선 채택**
   `html2canvas + jsPDF`는 캔버스 렌더링 품질 이슈와 번들 크기(약 500KB) 증가 문제가 있다. `window.print()`는 브라우저 네이티브 렌더링을 그대로 사용하므로 텍스트 품질이 높고 번들 크기에 영향 없다.

3. **견적서 목록에서 totalAmount 별도 조회 생략**
   견적서 목록 조회 시 `notion.databases.query()`만 호출하고 각 페이지의 Items DB를 별도 조회하지 않는다. 목록 카드에서는 `totalAmount = 0`이면 "-"로 표시한다.

4. **관리자 라우트 분리 (`/admin/*`)**
   공개 페이지(`/`, `/invoices/*`)와 관리자 페이지(`/admin/*`)를 레이아웃 레벨에서 완전히 분리한다. `middleware.ts`로 `/admin` 경로 전체에 인증 미들웨어를 적용하여 미인증 접근을 차단한다.

5. **관리자 PDF: 뷰어 페이지 재활용 + `?print=1` 파라미터**
   서버 사이드 PDF 생성(Puppeteer)은 Vercel 서버리스 환경에서 번들 크기 제약이 있다. 기존 뷰어 페이지와 `@media print` CSS를 재활용하여 `?print=1` 쿼리 파라미터로 자동 인쇄를 트리거하는 방식을 채택한다.

6. **서버 컴포넌트 + Suspense 패턴**
   목록/뷰어 페이지 모두 서버 컴포넌트로 구현하여 초기 HTML에 데이터를 포함시킨다. `React.Suspense`와 `Skeleton` 컴포넌트를 조합하여 로딩 중 UI를 제공한다.

---

## 📊 전체 일정 요약

```
2026-06-03   06-05   06-09   06-13   06-18   07-04   07-14
    |           |       |       |       |       |       |
    [=Phase 1==]
                [====Phase 2====]
                                [=Phase 3=]
                                           [====Phase 4====]
                                                           [=Phase 5=]
```

| Phase | 기간 | 주요 목표 | 상태 |
|-------|------|-----------|------|
| Phase 1: 기반 설정 | 2026-06-03 ~ 06-05 | 프로젝트 초기화, 도메인 모델, Notion 연동 레이어 | ✅ 완료 |
| Phase 2: API + 핵심 UI | 2026-06-05 ~ 06-09 | Route Handler, 뷰어/목록 UI 컴포넌트, 페이지 | ✅ 완료 |
| Phase 3: PDF + 오류 처리 | 2026-06-10 ~ 06-13 | @media print 완성, 오류 처리 강화 | ✅ 완료 |
| Phase 4: 관리자 기능 | 2026-06-18 ~ 06-18 | 인증, 대시보드, 링크 복사, PDF 다운로드 | ✅ 완료 |
| Phase 5: 배포 + 마무리 | 2026-07-07 ~ 07-14 | Vercel 배포, 모니터링, 코드 정리, 문서화 | 📋 대기 중 |

---

## 👥 팀 구성 및 역할

| 역할 | 담당 Phase | 주요 책임 |
|------|------------|----------|
| 풀스택 개발자 | Phase 1 ~ 5 전체 | Next.js 개발, Notion API 연동, UI 구현, 인증, 배포 |

> 1인 개발 체제. 일정에 20% 버퍼를 포함하여 수립됨.

---

## ⚠️ 리스크 관리

### 주요 리스크 목록

| # | 리스크 | 확률 | 영향 | 우선순위 | 대응 전략 |
|---|--------|------|------|----------|----------|
| 1 | 노션 속성명(한국어)이 실제 DB와 불일치 | 중 | 높음 | 높음 | Phase 5 배포 전 로컬에서 실제 DB 연동 테스트 필수 |
| 2 | NextAuth.js v5 beta API 변경 | 중 | 중 | 높음 | v5 공식 문서 및 릴리즈 노트 기준 작성, 고정 버전 사용 |
| 3 | Google OAuth Redirect URI 불일치 | 중 | 높음 | 높음 | 로컬 + 프로덕션 URI 사전 Google 콘솔 등록 |
| 4 | 브라우저 팝업 차단으로 새 탭 PDF 오픈 실패 | 중 | 중 | 중 | 사용자 클릭 이벤트 내에서 `window.open()` 호출 |
| 5 | `@media print` 브라우저 간 렌더링 차이 | 중 | 중 | 중 | Chrome 우선, Safari/Firefox 순차 검증 |
| 6 | Notion API Rate Limit 초과 (요청 3회/초) | 낮음 | 중 | 낮음 | 목록 페이지 ISR `revalidate` 도입 |
| 7 | Vercel 서버리스 함수 콜드 스타트 지연 | 중 | 낮음 | 낮음 | 초기 배포 후 측정, 필요 시 Edge Runtime 전환 |
| 8 | Clipboard API HTTPS 요구 (개발 환경) | 낮음 | 낮음 | 낮음 | `localhost`는 예외 적용됨, 프로덕션 Vercel HTTPS 자동 제공 |

---

## 📝 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0 | 2026-06-03 | 최초 작성. PRD 기반 5단계 로드맵 수립. Phase 1~2 완료 상태 반영 | - |
| 2.0 | 2026-06-18 | Phase 1~3 완료 상태 반영. Phase 4 관리자 기능 고도화 (인증, 대시보드, 링크 복사, PDF) 상세 구성. Phase 5 배포 및 운영 최적화로 재편성 | - |
