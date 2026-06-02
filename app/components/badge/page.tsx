import { Badge } from "@/components/ui/badge";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";

export default function BadgePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Badge</h1>
        <p className="text-muted-foreground mt-2">
          상태, 카테고리, 태그를 표시하는 뱃지 컴포넌트
        </p>
      </div>

      <ShowcaseSection title="Variants" description="6가지 variant 스타일">
        <div className="flex flex-wrap gap-4">
          <ShowcasePreview label="default">
            <Badge variant="default">Default</Badge>
          </ShowcasePreview>
          <ShowcasePreview label="secondary">
            <Badge variant="secondary">Secondary</Badge>
          </ShowcasePreview>
          <ShowcasePreview label="destructive">
            <Badge variant="destructive">Destructive</Badge>
          </ShowcasePreview>
          <ShowcasePreview label="outline">
            <Badge variant="outline">Outline</Badge>
          </ShowcasePreview>
          <ShowcasePreview label="ghost">
            <Badge variant="ghost">Ghost</Badge>
          </ShowcasePreview>
          <ShowcasePreview label="link">
            <Badge variant="link">Link</Badge>
          </ShowcasePreview>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="사용 예제" description="일반적인 사용 사례">
        <ShowcasePreview label="상태 표시">
          <div className="flex gap-2 flex-wrap">
            <Badge>활성</Badge>
            <Badge variant="secondary">대기 중</Badge>
            <Badge variant="destructive">종료</Badge>
          </div>
        </ShowcasePreview>
        <ShowcasePreview label="태그/카테고리">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">TypeScript</Badge>
          </div>
        </ShowcasePreview>
        <ShowcasePreview label="알림">
          <div className="flex gap-2 flex-wrap">
            <Badge>신규</Badge>
            <Badge variant="outline">인기</Badge>
            <Badge variant="ghost">추천</Badge>
          </div>
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
