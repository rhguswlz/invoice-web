import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";

export default function InputPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Input & Label</h1>
        <p className="text-muted-foreground mt-2">
          텍스트 입력 필드와 폼 레이블 컴포넌트
        </p>
      </div>

      <ShowcaseSection title="Input Types" description="다양한 입력 유형">
        <div className="space-y-4 w-full max-w-md">
          <ShowcasePreview label="text">
            <Input type="text" placeholder="텍스트 입력" />
          </ShowcasePreview>
          <ShowcasePreview label="email">
            <Input type="email" placeholder="이메일 입력" />
          </ShowcasePreview>
          <ShowcasePreview label="password">
            <Input type="password" placeholder="비밀번호 입력" />
          </ShowcasePreview>
          <ShowcasePreview label="number">
            <Input type="number" placeholder="숫자 입력" />
          </ShowcasePreview>
          <ShowcasePreview label="search">
            <Input type="search" placeholder="검색어 입력" />
          </ShowcasePreview>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Input States" description="다양한 상태">
        <div className="space-y-4 w-full max-w-md">
          <ShowcasePreview label="disabled">
            <Input type="text" placeholder="비활성 입력" disabled />
          </ShowcasePreview>
          <ShowcasePreview label="error (aria-invalid)">
            <Input
              type="text"
              placeholder="오류 상태"
              aria-invalid
              defaultValue="invalid input"
            />
          </ShowcasePreview>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Label + Input 조합" description="폼 필드 구성">
        <ShowcasePreview className="justify-start">
          <div className="w-full max-w-md space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="이메일을 입력하세요" />
          </div>
        </ShowcasePreview>
        <ShowcasePreview className="justify-start">
          <div className="w-full max-w-md space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="Form Layout" description="일반적인 폼 레이아웃">
        <ShowcasePreview className="justify-start">
          <div className="w-full max-w-md space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="홍길동" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email2">이메일</Label>
              <Input id="email2" type="email" placeholder="example@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">메시지</Label>
              <Input
                id="message"
                placeholder="메시지를 입력하세요"
                className="h-24"
              />
            </div>
          </div>
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
