import { FeatureCard } from "@/components/feature-card";
import { FEATURES } from "@/lib/constants";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";

export default function FeatureCardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Feature Card</h1>
        <p className="text-muted-foreground mt-2">
          아이콘, 제목, 설명을 표시하는 커스텀 카드 컴포넌트
        </p>
      </div>

      <ShowcaseSection title="모든 아이콘" description="6가지 아이콘 예제">
        <ShowcasePreview className="justify-start">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="단일 카드" description="Feature Card 개별 사용">
        <ShowcasePreview className="justify-start">
          <div className="w-full max-w-sm">
            <FeatureCard
              icon="Zap"
              title="빠른 성능"
              description="Next.js 16 App Router와 React 19로 최적화되었습니다."
            />
          </div>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="2열 레이아웃" description="반응형 그리드">
        <ShowcasePreview className="justify-start">
          <div className="w-full grid grid-cols-2 gap-4">
            {FEATURES.slice(0, 4).map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
