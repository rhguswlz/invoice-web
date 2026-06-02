import { FeatureCard } from "@/components/feature-card";
import { Section } from "@/components/layout/section";
import { PageContainer } from "@/components/layout/page-container";
import { FEATURES } from "@/lib/constants";

export function FeaturesSection() {
  return (
    <Section id="features" variant="muted">
      <PageContainer>
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            핵심 기능
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            프로덕션 환경에 바로 투입할 수 있는 검증된 기술 스택과 구조를
            제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}
