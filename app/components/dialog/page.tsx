import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
import {
  DialogExample,
  DialogNoCloseButton,
} from "@/components/showcase/examples/dialog-example";

export default function DialogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dialog</h1>
        <p className="text-muted-foreground mt-2">
          모달 다이얼로그 컴포넌트 - 사용자 입력 요청
        </p>
      </div>

      <ShowcaseSection title="기본 Dialog" description="Close 버튼 포함">
        <ShowcasePreview>
          <DialogExample />
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Close 버튼 없는 Dialog"
        description="showCloseButton={'{'}false{'}'}"
      >
        <ShowcasePreview>
          <DialogNoCloseButton />
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
