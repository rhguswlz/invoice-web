"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>다이얼로그 제목</DialogTitle>
          <DialogDescription>
            이것은 기본 다이얼로그의 예제입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>다이얼로그 콘텐츠가 여기에 들어갑니다.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DialogNoCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Close 버튼 없는 다이얼로그</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Close 버튼이 없습니다</DialogTitle>
          <DialogDescription>
            showCloseButton={'{'}false{'}'} 설정으로 우측 상단 X 버튼이 숨겨집니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>아래 버튼으로만 다이얼로그를 닫을 수 있습니다.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
