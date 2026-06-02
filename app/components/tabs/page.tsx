import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
import {
  TabsExample,
  TabsLineExample,
} from "@/components/showcase/examples/tabs-example";

export default function TabsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tabs</h1>
        <p className="text-muted-foreground mt-2">
          탭 네비게이션 컴포넌트 - 콘텐츠 영역 전환
        </p>
      </div>

      <ShowcaseSection
        title="기본 Tabs"
        description="variant='default' (pill 스타일)"
      >
        <ShowcasePreview className="justify-start">
          <div className="w-full max-w-md">
            <TabsExample />
          </div>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Line Variant"
        description="variant='line' (언더라인 스타일)"
      >
        <ShowcasePreview className="justify-start">
          <div className="w-full max-w-md">
            <TabsLineExample />
          </div>
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
