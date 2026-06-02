import type { FeatureItem, NavItem, SiteConfig, StatItem } from "@/types";

export const SITE_CONFIG: SiteConfig = {
  name: "스타터킷",
  description:
    "Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui v4로 만든 모던 웹 스타터킷",
  url: "https://nextjs-starter.example.com",
  githubUrl: "https://github.com/anthropics/claude-nextjs-starters",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "기능", href: "#features" },
  { label: "통계", href: "#stats" },
  { label: "시작하기", href: "#cta" },
  { label: "컴포넌트", href: "/components" },
];

export const FEATURES: FeatureItem[] = [
  {
    icon: "Zap",
    title: "빠른 성능",
    description:
      "Next.js 16 App Router와 React 19 서버 컴포넌트로 최적화된 성능을 제공합니다.",
  },
  {
    icon: "Palette",
    title: "아름다운 UI",
    description:
      "shadcn/ui v4와 Tailwind CSS v4로 완성도 높은 디자인 시스템을 구축했습니다.",
  },
  {
    icon: "Shield",
    title: "타입 안전",
    description:
      "TypeScript strict 모드와 Zod 스키마로 런타임 오류를 최소화합니다.",
  },
  {
    icon: "Moon",
    title: "다크 모드",
    description:
      "next-themes 기반 시스템 설정 연동 다크/라이트 모드를 지원합니다.",
  },
  {
    icon: "Smartphone",
    title: "반응형 디자인",
    description:
      "모바일 퍼스트 설계로 모든 디바이스에서 최적의 경험을 제공합니다.",
  },
  {
    icon: "Code2",
    title: "개발자 경험",
    description:
      "ESLint, TypeScript strict, 정리된 폴더 구조로 유지보수성을 높였습니다.",
  },
];

export const STATS: StatItem[] = [
  { value: "16", label: "Next.js 버전", description: "최신 App Router" },
  { value: "100%", label: "TypeScript", description: "Strict 모드" },
  { value: "v4", label: "Tailwind CSS", description: "CSS-first 설정" },
  { value: "19", label: "React 버전", description: "서버 컴포넌트" },
];
