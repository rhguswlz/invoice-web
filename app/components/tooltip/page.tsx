import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
import { TooltipExample } from "@/components/showcase/examples/tooltip-example";

export default function TooltipPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tooltip</h1>
        <p className="text-muted-foreground mt-2">
          호버 시 나타나는 툴팁 컴포넌트
        </p>
      </div>

      <ShowcaseSection
        title="4방향 Tooltip"
        description="side prop으로 위치 조절"
      >
        <ShowcasePreview>
          <TooltipExample />
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
