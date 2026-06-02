import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { NavLink } from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import { PageContainer } from "@/components/layout/page-container";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <PageContainer>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            {SITE_CONFIG.name}
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href} exact={item.href === "/"}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileMenu items={NAV_ITEMS} siteName={SITE_CONFIG.name} />
          </div>
        </div>
      </PageContainer>
      <Separator />
    </header>
  );
}
