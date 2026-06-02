import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { PageContainer } from "@/components/layout/page-container";

export function CTASection() {
  return (
    <Section id="cta" variant="muted">
      <PageContainer narrow>
        <div className="flex flex-col items-center text-center gap-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            지금 바로 시작하세요
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            반복적인 초기 설정 없이 비즈니스 로직에만 집중하세요. 이 스타터킷
            하나로 프로젝트를 빠르게 시작할 수 있습니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="#features">시작하기</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub에서 보기
              </a>
            </Button>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
