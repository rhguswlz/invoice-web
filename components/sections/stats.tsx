import { Section } from "@/components/layout/section";
import { PageContainer } from "@/components/layout/page-container";
import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <Section id="stats">
      <PageContainer>
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            기술 스택
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            최신 버전의 검증된 라이브러리로 구성되었습니다.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="text-4xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="font-semibold">{stat.label}</span>
              {stat.description && (
                <span className="text-sm text-muted-foreground">
                  {stat.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}
