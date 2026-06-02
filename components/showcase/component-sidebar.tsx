"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { COMPONENT_ITEMS } from "@/lib/component-showcase";

interface SidebarContentProps {
  pathname: string;
}

function SidebarContent({ pathname }: SidebarContentProps) {
  const shadcnItems = COMPONENT_ITEMS.filter((c) => c.category === "shadcn");
  const customItems = COMPONENT_ITEMS.filter((c) => c.category === "custom");

  const isActive = (href: string) => {
    if (href === "/components") {
      return pathname === "/components";
    }
    return pathname === href;
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 px-4 py-4">
        {/* 인덱스 링크 */}
        <div>
          <Link
            href="/components"
            className={cn(
              "block px-3 py-2 rounded-lg transition-colors",
              isActive("/components")
                ? "bg-primary text-primary-foreground font-medium"
                : "text-foreground hover:bg-muted"
            )}
          >
            모든 컴포넌트
          </Link>
        </div>

        {/* shadcn/ui 그룹 */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            shadcn/ui
          </h3>
          <nav className="space-y-1">
            {shadcnItems.map((item) => (
              <Link
                key={item.slug}
                href={`/components/${item.slug}`}
                className={cn(
                  "block px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive(`/components/${item.slug}`)
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 커스텀 그룹 */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            커스텀
          </h3>
          <nav className="space-y-1">
            {customItems.map((item) => (
              <Link
                key={item.slug}
                href={`/components/${item.slug}`}
                className={cn(
                  "block px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive(`/components/${item.slug}`)
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </ScrollArea>
  );
}

export function ComponentSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 모바일: Sheet 메뉴 */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* 데스크탑: 고정 사이드바 */}
      <aside className="hidden lg:block w-52 border-r">
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}
