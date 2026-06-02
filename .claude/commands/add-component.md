---
description: 새로운 React 함수형 컴포넌트를 생성합니다
argument-hint: "컴포넌트 이름 (예: Button, Card, Modal)"
---

`$ARGUMENTS` 이름의 React 함수형 컴포넌트를 `components/$ARGUMENTS.tsx`에 생성해주세요.

요구사항:
- TypeScript 사용 (`interface ${ARGUMENTS}Props` 정의)
- `children?: ReactNode`와 `className?: string` props 기본 포함
- `cn()` 함수 (`@/lib/utils`)로 Tailwind CSS 클래스 병합
- named export 사용 (`export function`)
- `@/lib/utils`에서 `cn` import, `react`에서 `ReactNode` import

이미 파일이 존재하면 덮어쓰지 말고 알려주세요.
