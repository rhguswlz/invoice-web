"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  exact?: boolean;
  external?: boolean;
  onClick?: () => void;
}

export function NavLink({
  href,
  children,
  className,
  exact = false,
  external = false,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  const isHashLink = href.startsWith("#");

  const baseClassName = cn(
    "text-sm font-medium transition-colors hover:text-foreground",
    isHashLink || external ? "text-muted-foreground" : isActive ? "text-foreground" : "text-muted-foreground",
    className
  );

  if (isHashLink) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={baseClassName}
      >
        {children}
      </a>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={baseClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={baseClassName}
    >
      {children}
    </Link>
  );
}
