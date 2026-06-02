import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";

export default function ButtonPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Button</h1>
        <p className="text-muted-foreground mt-2">
          상호작용 버튼 컴포넌트 - 6가지 variant와 8가지 크기
        </p>
      </div>

      <ShowcaseSection title="Variants" description="6가지 스타일">
        <div className="flex flex-wrap gap-4">
          <ShowcasePreview label="default">
            <Button>Default</Button>
          </ShowcasePreview>
          <ShowcasePreview label="outline">
            <Button variant="outline">Outline</Button>
          </ShowcasePreview>
          <ShowcasePreview label="secondary">
            <Button variant="secondary">Secondary</Button>
          </ShowcasePreview>
          <ShowcasePreview label="ghost">
            <Button variant="ghost">Ghost</Button>
          </ShowcasePreview>
          <ShowcasePreview label="destructive">
            <Button variant="destructive">Destructive</Button>
          </ShowcasePreview>
          <ShowcasePreview label="link">
            <Button variant="link">Link</Button>
          </ShowcasePreview>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" description="8가지 크기">
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap items-center">
            <ShowcasePreview label="xs" className="flex-1 min-w-fit">
              <Button size="xs">xs</Button>
            </ShowcasePreview>
            <ShowcasePreview label="sm" className="flex-1 min-w-fit">
              <Button size="sm">sm</Button>
            </ShowcasePreview>
            <ShowcasePreview label="default" className="flex-1 min-w-fit">
              <Button size="default">default</Button>
            </ShowcasePreview>
            <ShowcasePreview label="lg" className="flex-1 min-w-fit">
              <Button size="lg">lg</Button>
            </ShowcasePreview>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <ShowcasePreview label="icon-xs" className="flex-1 min-w-fit">
              <Button size="icon-xs">+</Button>
            </ShowcasePreview>
            <ShowcasePreview label="icon-sm" className="flex-1 min-w-fit">
              <Button size="icon-sm">+</Button>
            </ShowcasePreview>
            <ShowcasePreview label="icon" className="flex-1 min-w-fit">
              <Button size="icon">+</Button>
            </ShowcasePreview>
            <ShowcasePreview label="icon-lg" className="flex-1 min-w-fit">
              <Button size="icon-lg">+</Button>
            </ShowcasePreview>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="States" description="다양한 상태">
        <div className="flex flex-wrap gap-4">
          <ShowcasePreview label="disabled">
            <Button disabled>Disabled</Button>
          </ShowcasePreview>
          <ShowcasePreview label="loading">
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              로딩중
            </Button>
          </ShowcasePreview>
          <ShowcasePreview label="with icon">
            <Button>
              <span>버튼</span>
            </Button>
          </ShowcasePreview>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Full Width" description="전체 너비">
        <ShowcasePreview>
          <Button className="w-full">Full Width Button</Button>
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
