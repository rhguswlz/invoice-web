import { Separator } from "@/components/ui/separator";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";

export default function SeparatorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Separator</h1>
        <p className="text-muted-foreground mt-2">
          콘텐츠를 구분하는 수평/수직 구분선
        </p>
      </div>

      <ShowcaseSection title="수평 Separator" description="기본 horizontal 방향">
        <ShowcasePreview>
          <div className="w-full max-w-md space-y-4">
            <div>
              <h3 className="font-semibold">섹션 1</h3>
              <p className="text-sm text-muted-foreground">
                첫 번째 섹션의 내용입니다.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold">섹션 2</h3>
              <p className="text-sm text-muted-foreground">
                두 번째 섹션의 내용입니다.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold">섹션 3</h3>
              <p className="text-sm text-muted-foreground">
                세 번째 섹션의 내용입니다.
              </p>
            </div>
          </div>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="수직 Separator" description="vertical 방향">
        <ShowcasePreview>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">100</p>
              <p className="text-sm text-muted-foreground">다운로드</p>
            </div>
            <Separator orientation="vertical" className="h-16" />
            <div className="text-center">
              <p className="text-3xl font-bold">50</p>
              <p className="text-sm text-muted-foreground">좋아요</p>
            </div>
            <Separator orientation="vertical" className="h-16" />
            <div className="text-center">
              <p className="text-3xl font-bold">25</p>
              <p className="text-sm text-muted-foreground">공유</p>
            </div>
          </div>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="메뉴 구분" description="메뉴 아이템 구분">
        <ShowcasePreview className="justify-start">
          <div className="w-full max-w-md">
            <div className="py-2 px-4 text-sm font-medium">계정</div>
            <Separator />
            <div className="py-2 px-4 text-sm hover:bg-muted cursor-pointer">
              프로필
            </div>
            <div className="py-2 px-4 text-sm hover:bg-muted cursor-pointer">
              설정
            </div>
            <Separator />
            <div className="py-2 px-4 text-sm hover:bg-muted cursor-pointer text-destructive">
              로그아웃
            </div>
          </div>
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
