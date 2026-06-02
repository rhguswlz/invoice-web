import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
import {
  DropdownMenuExample,
  DropdownMenuWithActions,
} from "@/components/showcase/examples/dropdown-menu-example";

export default function DropdownMenuPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dropdown Menu</h1>
        <p className="text-muted-foreground mt-2">
          드롭다운 메뉴 컴포넌트 - 액션 항목 표시
        </p>
      </div>

      <ShowcaseSection title="계정 메뉴" description="오른쪽 정렬">
        <ShowcasePreview>
          <DropdownMenuExample />
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="작업 메뉴" description="여러 액션">
        <ShowcasePreview>
          <DropdownMenuWithActions />
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
