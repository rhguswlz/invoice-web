# Claude Next.js Starters

현대적인 웹 애플리케이션 개발을 위한 Next.js 스타터 템플릿입니다.

## 🎯 프로젝트 개요

이 프로젝트는 **Next.js 15 + React 19** 기반의 프로덕션 레벨 랜딩 페이지 스타터입니다. shadcn/ui 컴포넌트와 현대적인 개발 도구들을 통합하여 빠른 개발을 지원합니다.

## 🛠 기술 스택

### 핵심 프레임워크
- **Next.js 15.x** — React 기반 풀스택 프레임워크 (App Router)
- **React 19** — UI 라이브러리
- **TypeScript 5** — 정적 타입 체킹

### 스타일링 & UI
- **Tailwind CSS 4** — 유틸리티 우선 CSS 프레임워크
- **shadcn/ui** — Radix UI 기반 재사용 가능한 컴포넌트
- **Lucide React** — 아이콘 라이브러리
- **next-themes** — 라이트/다크모드 토글

### 폼 & 검증
- **React Hook Form 7** — 경량 폼 상태 관리
- **Zod 4** — TypeScript 우선 스키마 검증

### 개발 도구
- **ESLint 9** — 코드 품질 검사
- **PostCSS** — CSS 변환 및 최적화

## ✨ 주요 기능

- ✅ **반응형 디자인** — 모바일, 태블릿, 데스크톱 최적화
- ✅ **다크모드 지원** — next-themes를 통한 테마 전환
- ✅ **타입 안전성** — 전체 TypeScript 지원
- ✅ **SEO 최적화** — Next.js 메타데이터 API
- ✅ **폼 검증** — React Hook Form + Zod 통합
- ✅ **성능 최적화** — Next.js 기본 최적화 (이미지, 폰트)
- ✅ **컴포넌트 쇼케이스** — 미리 구성된 UI 컴포넌트

## 📂 프로젝트 구조

```
claude-nextjs-starters/
├── app/                    # Next.js App Router
│   ├── components/         # shadcn/ui 설치 컴포넌트
│   ├── page.tsx            # 홈 페이지
│   ├── layout.tsx          # 루트 레이아웃
│   ├── globals.css         # Tailwind 스타일
│   ├── error.tsx           # 에러 바운더리
│   ├── loading.tsx         # 로딩 UI
│   └── not-found.tsx       # 404 페이지
├── components/             # 커스텀 React 컴포넌트
│   ├── layout/             # Header, Footer
│   ├── sections/           # 페이지 섹션 (Hero, Features, Stats, CTA)
│   ├── showcase/           # 컴포넌트 데모
│   └── ui/                 # 커스텀 UI 컴포넌트
├── lib/                    # 유틸리티 & 헬퍼
│   ├── utils.ts            # 범용 함수
│   ├── constants.ts        # 설정 & 상수
│   ├── validations.ts      # Zod 스키마
│   └── component-showcase.ts
├── hooks/                  # 커스텀 React 훅
├── types/                  # TypeScript 타입 정의
└── public/                 # 정적 파일
```

## 🚀 빠른 시작

### 1. 개발 서버 실행
```bash
npm run dev
```
[http://localhost:3000](http://localhost:3000) 에서 확인하세요.

### 2. 코드 수정
`app/page.tsx` 또는 `components/` 의 파일들을 수정하면 자동으로 리로드됩니다.

### 3. 빌드 & 배포
```bash
npm run build    # 프로덕션 빌드
npm start        # 빌드된 앱 실행
npm run lint     # ESLint 검사
```

## 📋 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 시작 (hot reload) |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm start` | 빌드된 앱 실행 |
| `npm run lint` | ESLint로 코드 검사 |

## 🎨 스타일링

이 프로젝트는 **Tailwind CSS v4**를 사용하며, shadcn/ui 컴포넌트의 CSS 변수를 통해 일관된 디자인 토큰을 유지합니다.

- **색상 시스템**: CSS 변수 기반 (다크모드 지원)
- **반응형**: Tailwind 브레이크포인트 활용
- **커스터마이징**: `app/globals.css`에서 Tailwind 설정 가능

## 🔧 설정

### 사이트 정보
`lib/constants.ts` 에서 사이트 메타데이터 수정:
```typescript
export const SITE_CONFIG = {
  name: "Your Site Name",
  description: "Your site description",
  url: "https://yoursite.com",
};
```

### 타입 정의
`types/index.ts`에 공통 타입 정의:
- `NavItem` — 네비게이션 항목
- `FeatureItem` — 기능 항목
- `StatItem` — 통계 항목
- `SiteConfig` — 사이트 설정

## 🌐 배포

### Vercel (추천)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 추가 리소스

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com)

## 🎓 주의사항

이 프로젝트는 **Next.js 16.x**를 기반으로 하며, 이전 버전의 문서와는 차이가 있을 수 있습니다. 자세한 내용은 `AGENTS.md`를 참고하세요.

## 📝 라이선스

MIT
