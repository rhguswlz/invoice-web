"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 * 커스텀 오류 페이지 (클라이언트 컴포넌트)
 *
 * Next.js App Router의 error.tsx 규약에 따라 렌더링 오류 발생 시 표시됩니다.
 * `reset()`은 Error Boundary를 초기화하고, `router.refresh()`는 서버 데이터를
 * 재요청하여 더 확실한 복구를 보장합니다.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // 프로덕션 환경에서는 Sentry, LogRocket 등 에러 모니터링 서비스로 교체 권장
    console.error(error);
  }, [error]);

  /**
   * 오류 메시지를 파싱하여 사용자 친화적인 안내 문구를 반환합니다.
   * 네트워크 오류와 일반 오류를 구분합니다.
   */
  function getErrorMessage(err: Error): string {
    const message = err.message ?? "";
    const isNetworkError =
      message.includes("Failed to fetch") ||
      message.includes("NetworkError") ||
      message.includes("fetch");

    if (isNetworkError) {
      return "서버와 연결할 수 없습니다. 인터넷 연결을 확인해 주세요.";
    }

    return "예상치 못한 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }

  /**
   * 재시도 핸들러
   * router.refresh()로 서버 데이터를 재요청한 뒤 Error Boundary를 초기화합니다.
   */
  function handleRetry() {
    router.refresh();
    reset();
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-32 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">오류가 발생했습니다</h1>
        {/* 오류 유형에 따라 다른 안내 메시지 표시 */}
        <p className="text-muted-foreground">{getErrorMessage(error)}</p>
      </div>

      {/* 액션 버튼: 재시도 우선, 목록 이동 보조 */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={handleRetry}>다시 시도</Button>
        <Button variant="outline" asChild>
          <Link href="/invoices">견적서 목록으로</Link>
        </Button>
      </div>
    </div>
  );
}
