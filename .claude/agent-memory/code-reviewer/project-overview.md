---
name: project-overview
description: claude-nextjs-starters 프로젝트 구조, 기술 스택, 아키텍처 특이사항 요약
metadata:
  type: project
---

이 프로젝트는 Next.js 16.2.6 + React 19 + TypeScript 스타터킷이다. shadcn/ui는 radix-nova 스타일(표준 new-york/default가 아님)을 사용한다.

**Why:** 반복적인 초기 설정 없이 바로 개발을 시작할 수 있는 프로덕션 수준 스타터킷 제공이 목적이다.

**How to apply:**
- `components/ui/` 하위 파일은 shadcn CLI가 생성한 파일이므로 직접 수정 최소화
- 커스텀 컴포넌트는 `components/` 루트 또는 `components/layout/`, `components/sections/`, `components/showcase/`에 위치
- App Router 페이지는 `app/` 하위에만 존재
- 타입은 `types/index.ts`에 정의하고 `@/types`로 import
- 상수/설정은 `lib/constants.ts`, Zod 스키마는 `lib/validations.ts`
- `useIsMobile()` 훅은 `usehooks-ts`의 `useMediaQuery`를 래핑함
- 컴포넌트 쇼케이스는 `app/components/[slug]/page.tsx` 구조로 되어 있으나 dynamic route가 아닌 정적 파일 생성 방식임
