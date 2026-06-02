import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";

export default function LabelPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Label</h1>
        <p className="text-muted-foreground mt-2">
          폼 입력 필드용 레이블 컴포넌트
        </p>
      </div>

      <ShowcaseSection title="기본 Label" description="Input과 함께 사용">
        <ShowcasePreview className="justify-start">
          <div className="w-full max-w-md space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" placeholder="이름을 입력하세요" />
          </div>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="필수 필드 표시" description="asterisk 추가">
        <ShowcasePreview className="justify-start">
          <div className="w-full max-w-md space-y-2">
            <Label htmlFor="email">
              이메일 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="Checkbox + Label" description="체크박스와 함께">
        <ShowcasePreview className="justify-start">
          <div className="w-full max-w-md space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="cursor-pointer font-normal">
                약관에 동의합니다
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter" className="cursor-pointer font-normal">
                뉴스레터 구독
              </Label>
            </div>
          </div>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="폼 레이아웃" description="여러 레이블">
        <ShowcasePreview className="justify-start">
          <div className="w-full max-w-md space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fname">이름</Label>
              <Input id="fname" placeholder="홍길동" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="femail">이메일</Label>
              <Input id="femail" type="email" placeholder="example@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input id="phone" placeholder="010-0000-0000" />
            </div>
          </div>
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
