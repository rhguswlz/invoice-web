---
name: known-issues
description: 이 프로젝트에서 확인된 ESLint 에러 및 반복 패턴 문제 목록
metadata:
  type: project
---

## 확인된 ESLint 에러 (2개)

1. **react-hooks/static-components**: `ComponentSidebar` 내부에서 `SidebarContent` 컴포넌트를 render 함수 내부에 정의함 (`components/showcase/component-sidebar.tsx`의 26번 줄). 컴포넌트를 외부로 분리하거나 JSX를 직접 인라인으로 작성해야 함.
2. **@typescript-eslint/no-unused-vars (warning)**: `app/components/page.tsx`에서 `CardContent` 미사용, `component-sidebar.tsx`에서 `X` 아이콘 미사용.

## 반복 패턴 문제

- **cn() 미사용**: `ShowcasePreview`, `ShowcaseSection`, `ComponentSidebar`에서 `cn()`을 사용하지 않고 템플릿 리터럴(`\`...\${...}\``)로 조건부 className 처리함. 프로젝트 컨벤션 위반.
- **Footer의 중복 레이아웃**: `footer.tsx`가 `PageContainer`를 사용하지 않고 `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`를 직접 하드코딩함.
- **NavItem.external 미처리**: `types/index.ts`에 `external?: boolean` 필드가 있으나 `NavLink`, `MobileMenu` 어디에도 처리 로직이 없음.
- **checkbox/index.tsx**: `app/components/checkbox/index.tsx`가 `page.tsx`가 아닌 `index.tsx`로 되어 있어 App Router에서 페이지로 인식되지 않음. 실제로는 컴포넌트 정의 파일이 잘못 배치된 것으로 보임 (체크박스 쇼케이스 페이지 없음).

**Why:** 초기 스캐폴딩 시 일관성이 부족했거나 일부 파일이 미완성 상태임.

**How to apply:** 위 패턴들을 새 컴포넌트 작성 시 반복하지 않도록 주의. 리뷰 시 cn() 사용 여부와 PageContainer 활용 여부를 항상 확인.
