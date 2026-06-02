"use client";

import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

export function TooltipExample() {
  return (
    <TooltipProvider>
      <div className="flex gap-4 flex-wrap items-center justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Info className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">위쪽 툴팁</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Info className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">아래쪽 툴팁</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Info className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">왼쪽 툴팁</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Info className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">오른쪽 툴팁</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
