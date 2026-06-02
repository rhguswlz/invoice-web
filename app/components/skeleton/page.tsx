import { Skeleton } from "@/components/ui/skeleton";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";

export default function SkeletonPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Skeleton</h1>
        <p className="text-muted-foreground mt-2">
          로딩 상태를 나타내는 스켈레톤 플레이스홀더
        </p>
      </div>

      <ShowcaseSection title="기본 Skeleton" description="다양한 형태">
        <div className="space-y-4 w-full max-w-md">
          <ShowcasePreview label="텍스트">
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </ShowcasePreview>
          <ShowcasePreview label="원형">
            <Skeleton className="h-12 w-12 rounded-full" />
          </ShowcasePreview>
          <ShowcasePreview label="직사각형">
            <Skeleton className="h-32 w-full" />
          </ShowcasePreview>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="카드 로딩" description="카드 형태의 스켈레톤">
        <ShowcasePreview>
          <div className="w-full max-w-sm space-y-4 border rounded-lg p-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <Skeleton className="h-32 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-10 w-1/4" />
            </div>
          </div>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="사용자 정보 로딩" description="프로필 카드">
        <ShowcasePreview>
          <div className="w-full max-w-sm space-y-4 flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
