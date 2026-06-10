import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * 커스텀 404 페이지
 *
 * 존재하지 않는 견적서 ID 또는 잘못된 URL 접근 시 표시됩니다.
 * 견적서 목록 및 홈으로 이동하는 링크를 제공합니다.
 */
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-32 text-center">
      {/* 404 숫자 강조 표시 */}
      <p className="text-8xl font-bold text-muted-foreground/30">404</p>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
        <p className="text-muted-foreground">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        {/* 견적서 서비스 맥락 안내 */}
        <p className="text-sm text-muted-foreground">
          견적서 링크가 올바른지 확인해 주세요.
        </p>
      </div>

      {/* 이동 버튼: 목록 우선, 홈 보조 */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/invoices">견적서 목록 보기</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
