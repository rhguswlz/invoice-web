export type ComponentMeta = {
  slug: string;
  label: string;
  description: string;
  category: "shadcn" | "custom";
};

export const COMPONENT_ITEMS: ComponentMeta[] = [
  {
    slug: "badge",
    label: "Badge",
    description: "상태·카테고리 표시용 뱃지",
    category: "shadcn",
  },
  {
    slug: "button",
    label: "Button",
    description: "6가지 variant, 8가지 size",
    category: "shadcn",
  },
  {
    slug: "card",
    label: "Card",
    description: "콘텐츠 컨테이너 카드",
    category: "shadcn",
  },
  {
    slug: "input",
    label: "Input",
    description: "텍스트 입력 필드",
    category: "shadcn",
  },
  {
    slug: "label",
    label: "Label",
    description: "폼 입력 필드용 레이블",
    category: "shadcn",
  },
  {
    slug: "tabs",
    label: "Tabs",
    description: "수평/수직 탭 네비게이션",
    category: "shadcn",
  },
  {
    slug: "dialog",
    label: "Dialog",
    description: "모달 다이얼로그",
    category: "shadcn",
  },
  {
    slug: "alert-dialog",
    label: "Alert Dialog",
    description: "확인/취소 경고 다이얼로그",
    category: "shadcn",
  },
  {
    slug: "dropdown-menu",
    label: "Dropdown Menu",
    description: "드롭다운 메뉴",
    category: "shadcn",
  },
  {
    slug: "avatar",
    label: "Avatar",
    description: "사용자 아바타, 그룹, 뱃지",
    category: "shadcn",
  },
  {
    slug: "skeleton",
    label: "Skeleton",
    description: "로딩 상태 플레이스홀더",
    category: "shadcn",
  },
  {
    slug: "tooltip",
    label: "Tooltip",
    description: "호버 툴팁",
    category: "shadcn",
  },
  {
    slug: "separator",
    label: "Separator",
    description: "수평/수직 구분선",
    category: "shadcn",
  },
  {
    slug: "toast",
    label: "Toast",
    description: "토스트 알림 (Sonner)",
    category: "shadcn",
  },
  {
    slug: "feature-card",
    label: "Feature Card",
    description: "아이콘 + 제목 + 설명 카드",
    category: "custom",
  },
  {
    slug: "theme-toggle",
    label: "Theme Toggle",
    description: "다크/라이트 모드 토글",
    category: "custom",
  },
];
