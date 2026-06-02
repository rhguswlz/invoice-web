"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ToastExample() {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        onClick={() => toast.success("성공! 작업이 완료되었습니다.")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("오류! 작업을 다시 시도해주세요.")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("주의! 중요한 알림입니다.")}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("정보: 추가 정보를 확인하세요.")}
      >
        Info
      </Button>
    </div>
  );
}
