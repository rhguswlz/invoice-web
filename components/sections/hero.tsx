import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-24 md:py-32">
      <PageContainer>
        <div className="flex flex-col items-center text-center gap-6">
          <Badge variant="secondary" className="px-4 py-1 text-sm">
            Next.js 16 + React 19
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl max-w-3xl">
            모던 웹 개발의
            <br />
            <span className="text-primary">빠른 시작점</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui v4로 구성된
            프로덕션 수준의 스타터킷입니다. 반복 설정 없이 즉시 개발을
            시작하세요.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Button size="lg" asChild>
              <Link href="#features">시작하기</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
