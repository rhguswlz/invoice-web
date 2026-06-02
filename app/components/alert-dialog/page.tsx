import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
import {
  AlertDialogExample,
  AlertDialogSmall,
  AlertDialogWithMedia,
} from "@/components/showcase/examples/alert-dialog-example";

export default function AlertDialogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Alert Dialog</h1>
        <p className="text-muted-foreground mt-2">
          확인/취소 경고 다이얼로그 - 중요한 동작 확인
        </p>
      </div>

      <ShowcaseSection title="기본 AlertDialog" description="size='default'">
        <ShowcasePreview>
          <AlertDialogExample />
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="Small Size" description="size='sm'">
        <ShowcasePreview>
          <AlertDialogSmall />
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="아이콘 포함"
        description="AlertDialogMedia로 아이콘 표시"
      >
        <ShowcasePreview>
          <AlertDialogWithMedia />
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
