/**
 * 프로젝트 전역 상수 모음
 * 사이트 설정, 네비게이션 항목 등을 관리합니다.
 */
import type { NavItem, SiteConfig } from "@/types";

/** 사이트 기본 메타데이터 */
export const SITE_CONFIG: SiteConfig = {
  name: "견적서 서비스",
  description:
    "노션에 입력한 견적서를 웹에서 확인하고 PDF로 다운로드할 수 있는 서비스입니다.",
  url: "https://invoice.example.com",
  githubUrl: "https://github.com/zhguswlz/invoice-web",
};

/** 헤더 네비게이션 메뉴 항목 */
export const NAV_ITEMS: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "견적서 목록", href: "/invoices" },
];
