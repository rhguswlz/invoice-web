import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";

export default function AvatarPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Avatar</h1>
        <p className="text-muted-foreground mt-2">
          사용자 아바타 컴포넌트 - 여러 크기와 상태 지원
        </p>
      </div>

      <ShowcaseSection title="Sizes" description="3가지 크기">
        <div className="flex gap-4 items-center">
          <ShowcasePreview label="sm">
            <Avatar size="sm">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>KH</AvatarFallback>
            </Avatar>
          </ShowcasePreview>
          <ShowcasePreview label="default">
            <Avatar size="default">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>KH</AvatarFallback>
            </Avatar>
          </ShowcasePreview>
          <ShowcasePreview label="lg">
            <Avatar size="lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>KH</AvatarFallback>
            </Avatar>
          </ShowcasePreview>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Fallback" description="이미지 없을 때 이니셜 표시">
        <div className="flex gap-4">
          <ShowcasePreview label="KH">
            <Avatar>
              <AvatarFallback>KH</AvatarFallback>
            </Avatar>
          </ShowcasePreview>
          <ShowcasePreview label="JD">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </ShowcasePreview>
          <ShowcasePreview label="AB">
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </ShowcasePreview>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="AvatarBadge" description="상태 배지 표시">
        <div className="flex gap-4">
          <ShowcasePreview label="온라인">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>KH</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          </ShowcasePreview>
          <ShowcasePreview label="오프라인">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>KH</AvatarFallback>
            </Avatar>
          </ShowcasePreview>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="AvatarGroup" description="겹치는 아바타 그룹">
        <ShowcasePreview>
          <AvatarGroup>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>KH</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+5</AvatarGroupCount>
          </AvatarGroup>
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
