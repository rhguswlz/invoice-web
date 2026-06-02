import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/layout/page-container";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-background">
      <Separator />
      <PageContainer>
        <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Next.js
            </Link>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
