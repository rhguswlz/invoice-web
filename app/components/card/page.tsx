import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { ShowcasePreview } from "@/components/showcase/showcase-preview";

export default function CardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Card</h1>
        <p className="text-muted-foreground mt-2">
          콘텐츠를 감싸는 카드 컴포넌트 - 다양한 서브컴포넌트 지원
        </p>
      </div>

      <ShowcaseSection title="기본 Card (default size)">
        <ShowcasePreview>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드 설명</CardDescription>
            </CardHeader>
            <CardContent>
              <p>카드 콘텐츠가 여기에 들어갑니다.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">취소</Button>
              <Button className="ml-2">확인</Button>
            </CardFooter>
          </Card>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="Small Card (size=sm)">
        <ShowcasePreview>
          <Card size="sm" className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-base">작은 카드</CardTitle>
              <CardDescription className="text-xs">
                간단한 설명
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">작은 크기의 콘텐츠</p>
            </CardContent>
          </Card>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="CardAction 포함">
        <ShowcasePreview>
          <Card className="w-full max-w-sm">
            <CardHeader className="flex-row items-start justify-between">
              <div>
                <CardTitle>액션이 있는 카드</CardTitle>
                <CardDescription>우측에 버튼이 있습니다</CardDescription>
              </div>
              <CardAction>
                <Button size="sm" variant="ghost">
                  ...
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p>헤더에 CardAction 컴포넌트를 사용했습니다.</p>
            </CardContent>
          </Card>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="이미지 포함 카드">
        <ShowcasePreview>
          <Card className="w-full max-w-sm overflow-hidden">
            <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-purple-500" />
            <CardHeader>
              <CardTitle>이미지 있는 카드</CardTitle>
              <CardDescription>상단에 이미지 영역이 있습니다</CardDescription>
            </CardHeader>
            <CardContent>
              <p>이미지 하단에 콘텐츠가 배치됩니다.</p>
            </CardContent>
          </Card>
        </ShowcasePreview>
      </ShowcaseSection>

      <ShowcaseSection title="그리드 레이아웃">
        <ShowcasePreview className="justify-start">
          <div className="w-full grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} size="sm">
                <CardHeader>
                  <CardTitle className="text-base">카드 {i}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">작은 카드 예제</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ShowcasePreview>
      </ShowcaseSection>
    </div>
  );
}
