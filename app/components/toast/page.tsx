import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";
import { ToastExample } from "@/components/showcase/examples/toast-example";

export default function ToastPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Toast</h1>
        <p className="text-muted-foreground mt-2">
          토스트 알림 컴포넌트 - Sonner 기반
        </p>
      </div>

      <ShowcaseSection
        title="Toast 유형"
        description="success, error, warning, info"
      >
        <ShowcasePreview>
          <ToastExample />
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="사용 방법" description="코드 예제">
        <div className="bg-muted rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-muted-foreground font-mono">
{`import { toast } from "sonner"

// 성공
toast.success("저장되었습니다!")

// 오류
toast.error("오류가 발생했습니다.")

// 경고
toast.warning("주의하세요.")

// 정보
toast.info("알림입니다.")`}
          </pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}
