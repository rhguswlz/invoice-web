export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type FeatureIconName = "Zap" | "Palette" | "Shield" | "Moon" | "Smartphone" | "Code2";

export type FeatureItem = {
  icon: FeatureIconName;
  title: string;
  description: string;
};

export type StatItem = {
  value: string;
  label: string;
  description?: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  githubUrl: string;
};
