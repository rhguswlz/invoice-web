# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 16.2.6 스타터 프로젝트로, shadcn/ui 컴포넌트 쇼케이스와 모던 랜딩 페이지를 포함합니다. React 19, TypeScript 5, Tailwind CSS v4를 사용합니다. **Next.js 16은 학습 데이터와 Breaking Changes가 있으므로** 새 코드 작성 전 반드시 `AGENTS.md`와 `node_modules/next/dist/docs/`를 확인하세요.

## 개발 명령어

```bash
# 개발 서버 시작 (localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm start

# ESLint 검사
npm run lint
```

## 프로젝트 구조

```
├── app/                          # App Router (Next.js 16)
│   ├── components/               # 컴포넌트 쇼케이스 라우트 (/components, /components/[slug])
│   │   ├── layout.tsx            # 쇼케이스 레이아웃 (사이드바 포함)
│   │   ├── page.tsx              # 컴포넌트 목록 페이지
│   │   └── [slug]/page.tsx       # 개별 컴포넌트 데모 페이지
│   ├── layout.tsx                # 루트 레이아웃 (Providers, Header, Footer)
│   ├── page.tsx                  # 홈 페이지 (Hero, Features, Stats, CTA)
│   ├── globals.css               # Tailwind v4 글로벌 스타일 + CSS 변수
│   ├── error.tsx                 # 에러 바운더리
│   ├── loading.tsx               # 로딩 UI
│   └── not-found.tsx             # 404 페이지
├── components/                   # 커스텀 컴포넌트
│   ├── ui/                       # shadcn/ui 설치 컴포넌트 (실제 설치 위치)
│   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── header.tsx            # 헤더 (네비게이션, 모바일 메뉴, 테마 토글)
│   │   ├── footer.tsx            # 푸터
│   │   ├── page-container.tsx    # 페이지 콘텐츠 컨테이너
│   │   └── section.tsx           # 섹션 래퍼
│   ├── sections/                 # 랜딩 페이지 섹션
│   │   ├── hero.tsx              # 히어로 섹션
│   │   ├── features.tsx          # 기능 소개 섹션
│   │   ├── stats.tsx             # 통계 섹션
│   │   └── cta.tsx               # CTA 섹션
│   ├── showcase/                 # 컴포넌트 쇼케이스 UI
│   │   ├── component-sidebar.tsx # 쇼케이스 사이드바 (shadcn/커스텀 분류)
│   │   ├── showcase-preview.tsx  # 컴포넌트 프리뷰 래퍼
│   │   ├── showcase-section.tsx  # 쇼케이스 섹션
│   │   └── examples/             # 각 컴포넌트 예제 파일들
│   ├── providers.tsx             # ThemeProvider + Sonner Toaster 래핑
│   ├── mobile-menu.tsx           # 모바일 네비게이션 메뉴 (Sheet 기반)
│   ├── nav-link.tsx              # 활성 상태 감지 네비게이션 링크
│   ├── theme-toggle.tsx          # 다크/라이트 모드 토글 버튼
│   └── feature-card.tsx          # 기능 소개 카드 컴포넌트
├── lib/                          # 유틸리티 & 설정
│   ├── utils.ts                  # cn() 클래스 병합 헬퍼
│   ├── constants.ts              # SITE_CONFIG, NAV_ITEMS, FEATURES, STATS
│   ├── validations.ts            # Zod 스키마 (contactFormSchema, newsletterSchema)
│   └── component-showcase.ts    # COMPONENT_ITEMS 메타데이터 목록
├── hooks/                        # 커스텀 훅
│   └── use-mobile.ts             # useIsMobile() — 768px 미만 감지 (usehooks-ts 기반)
├── types/                        # 공통 타입 정의
│   └── index.ts                  # NavItem, FeatureItem, FeatureIconName, StatItem, SiteConfig
├── .env.example                  # 환경 변수 예시 (SLACK_WEBHOOK_URL)
└── public/                       # 정적 파일
```

## 핵심 기술 스택

| 패키지 | 버전 | 용도 |
|--------|------|------|
| **next** | 16.2.6 | App Router, Server Components |
| **react** | 19.2.4 | UI 라이브러리 |
| **typescript** | ^5 | 타입 안전성 (strict 모드) |
| **tailwindcss** | ^4 | CSS 프레임워크 (PostCSS 통합) |
| **shadcn** | ^4.7.0 | UI 컴포넌트 라이브러리 CLI |
| **radix-ui** | ^1.4.3 | Radix 통합 패키지 (개별 패키지 대신 사용) |
| **react-hook-form** | ^7.75.0 | 폼 상태 관리 |
| **zod** | ^4.4.3 | 스키마 검증 |
| **next-themes** | ^0.4.6 | 다크/라이트 모드 |
| **sonner** | ^2.0.7 | 토스트 알림 |
| **lucide-react** | ^1.14.0 | 아이콘 |
| **usehooks-ts** | ^3.1.1 | useMediaQuery 등 유틸리티 훅 |
| **class-variance-authority** | ^0.7.1 | 컴포넌트 variant 정의 |
| **tailwind-merge** | ^3.6.0 | Tailwind 클래스 병합 |
| **tw-animate-css** | ^1.4.0 | Tailwind 애니메이션 유틸리티 |

## 코드 스타일 & 패턴

- **들여쓰기:** 2칸 공백
- **변수/함수명:** camelCase (영어)
- **컴포넌트명:** PascalCase
- **스타일링:** Tailwind + `cn()` 함수 (`lib/utils.ts`)로 클래스 병합

### 컴포넌트 작성 패턴

1. **shadcn/ui 컴포넌트:** `components/ui/`에서 import
   ```tsx
   import { Button } from "@/components/ui/button"
   import { Card, CardContent } from "@/components/ui/card"
   ```
   > ⚠️ `app/components/`는 shadcn/ui 설치 위치가 **아닙니다** — 쇼케이스 라우트입니다.

2. **타입 정의:** `types/index.ts` 및 `lib/component-showcase.ts` 참조
   ```tsx
   import type { NavItem, FeatureItem, SiteConfig } from "@/types"
   import type { ComponentMeta } from "@/lib/component-showcase"
   ```

3. **폼 검증:** React Hook Form + Zod
   ```tsx
   import { useForm } from "react-hook-form"
   import { zodResolver } from "@hookform/resolvers/zod"
   import { contactFormSchema, type ContactFormValues } from "@/lib/validations"

   const form = useForm<ContactFormValues>({
     resolver: zodResolver(contactFormSchema),
   })
   ```

4. **동적 클래스:** cn() 함수 활용
   ```tsx
   import { cn } from "@/lib/utils"

   className={cn("base-class", isActive && "active-class", variant === "primary" && "primary-class")}
   ```

5. **모바일 감지:** useIsMobile 훅
   ```tsx
   import { useIsMobile } from "@/hooks/use-mobile"

   const isMobile = useIsMobile() // 768px 미만 true
   ```

### 다크모드 & Providers

`app/layout.tsx`는 `<Providers>` 컴포넌트로 앱 전체를 래핑합니다:
- `components/providers.tsx` = ThemeProvider (next-themes) + Sonner Toaster 통합
- 클라이언트 컴포넌트에서 `useTheme()` 사용:
  ```tsx
  "use client"
  import { useTheme } from "next-themes"

  const { theme, setTheme } = useTheme()
  ```

### 토스트 알림 (Sonner)

`sonner` 라이브러리 기반. `Providers`에서 이미 `<Toaster>` 마운트됨:
```tsx
import { toast } from "sonner"

toast.success("저장되었습니다!")
toast.error("오류가 발생했습니다.")
toast("기본 알림 메시지")
```

### 폰트

`app/layout.tsx`에서 Geist 폰트 로드 (`next/font/google`):
- `--font-geist-sans`: Geist Sans (본문용)
- `--font-geist-mono`: Geist Mono (코드용)

### 라우팅

- **페이지:** `app/[segment]/page.tsx`
- **동적 경로:** `app/[slug]/page.tsx` (`generateStaticParams()` 활용)
- **API 라우트:** `app/api/[route]/route.ts`
- **레이아웃 공유:** `app/[segment]/layout.tsx`
- **컴포넌트 쇼케이스:** `app/components/[slug]/page.tsx`

### Next.js 16 주의사항

1. **Server Components 기본** — `"use client"` 지시문 없으면 서버 컴포넌트
2. **Dynamic Imports** — `next/dynamic` 사용
3. **Image 최적화** — `next/image`의 `Image` 컴포넌트 사용
4. **Font Loading** — `next/font/google` 또는 `next/font/local`
5. **메타데이터 API** — `layout.tsx`에서 `metadata` 객체 또는 `generateMetadata()` 내보내기
6. **Streaming & Suspense** — `React.Suspense`로 점진적 렌더링

상세 API 변경사항: `node_modules/next/dist/docs/` 및 `AGENTS.md` 참고.

## 설정

### Site Metadata (`lib/constants.ts`)

```typescript
export const SITE_CONFIG: SiteConfig = {
  name: "사이트명",
  description: "사이트 설명",
  url: "https://example.com",
  githubUrl: "https://github.com/org/repo",  // SiteConfig에 필수 필드
}
```

### TypeScript Aliases (`tsconfig.json`)

```json
{ "paths": { "@/*": ["./*"] } }
```

`@/*` 단일 alias: `@/components`, `@/lib`, `@/hooks`, `@/types` 등 모든 경로 처리.

### shadcn/ui 설정 (`components.json`)

```json
{
  "style": "radix-nova",
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "utils": "@/lib/utils",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

- **Style:** Radix Nova
- **Base Color:** Neutral
- **CSS Variables:** 활성화
- **Icon Library:** Lucide

## 컴포넌트 쇼케이스 시스템

`/components` 경로에서 모든 shadcn/ui 및 커스텀 컴포넌트 데모를 확인할 수 있습니다.

**쇼케이스 구조:**
- `lib/component-showcase.ts`: `COMPONENT_ITEMS` 배열로 쇼케이스 메타데이터 관리
- `app/components/[slug]/page.tsx`: 동적 라우트로 각 컴포넌트 데모 페이지 생성
- `components/showcase/examples/`: 실제 예제 컴포넌트 파일들

**컴포넌트 분류:**
- `"shadcn"` 카테고리: Badge, Button, Card, Input, Dialog 등 shadcn/ui 컴포넌트
- `"custom"` 카테고리: FeatureCard, ThemeToggle 등 커스텀 컴포넌트

```typescript
// lib/component-showcase.ts에서 ComponentMeta 타입 사용
import { COMPONENT_ITEMS, type ComponentMeta } from "@/lib/component-showcase"
```

## 타입 정의 요약

| 타입 | 위치 | 설명 |
|------|------|------|
| `NavItem` | `types/index.ts` | 네비게이션 항목 (`label`, `href`, `external?`) |
| `FeatureItem` | `types/index.ts` | 기능 소개 카드 (`icon`, `title`, `description`) |
| `FeatureIconName` | `types/index.ts` | 허용 아이콘 이름 유니온 타입 |
| `StatItem` | `types/index.ts` | 통계 항목 (`value`, `label`, `description?`) |
| `SiteConfig` | `types/index.ts` | 사이트 설정 (`name`, `description`, `url`, `githubUrl`) |
| `ComponentMeta` | `lib/component-showcase.ts` | 쇼케이스 항목 (`slug`, `label`, `description`, `category`) |
| `ContactFormValues` | `lib/validations.ts` | 문의 폼 검증 타입 |
| `NewsletterValues` | `lib/validations.ts` | 뉴스레터 구독 폼 검증 타입 |

## 중요 사항

- **언어:** 모든 코드 주석, 커밋 메시지, 문서는 한국어로 작성합니다.
- **Next.js 16 Breaking Changes:** 학습 데이터와 다를 수 있으므로 `AGENTS.md` 및 `node_modules/next/dist/docs/` 확인
- **shadcn/ui 설치 위치:** `components/ui/` — `app/components/`와 혼동 주의
- **Component Library:** shadcn/ui 컴포넌트를 활용해 새 컴포넌트 구성
- **Type Safety:** TypeScript strict 모드 활성화. `types/index.ts`에 공통 타입 정의하여 재사용
- **환경 변수:** `.env.example` 참고하여 `.env` 파일 설정 (SLACK_WEBHOOK_URL 등)
