import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ThemeTogglePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Theme Toggle</h1>
        <p className="text-muted-foreground mt-2">
          다크/라이트 모드 토글 커스텀 컴포넌트
        </p>
      </div>

      <ShowcaseSection title="테마 토글" description="오른쪽 버튼 클릭">
        <ShowcasePreview>
          <ThemeToggle />
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="특징" description="기능 설명">
        <div className="space-y-2 text-sm">
          <p>✓ next-themes 기반 테마 관리</p>
          <p>✓ 시스템 설정 자동 감지</p>
          <p>✓ 부드러운 전환 애니메이션</p>
          <p>✓ 로컬 저장소에 사용자 선택 저장</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
