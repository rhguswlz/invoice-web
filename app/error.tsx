"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 프로덕션 환경에서는 Sentry, LogRocket 등 에러 모니터링 서비스로 교체 권장
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-32 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">오류가 발생했습니다</h1>
        <p className="text-muted-foreground">
          예상치 못한 문제가 발생했습니다. 다시 시도해 주세요.
        </p>
      </div>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
