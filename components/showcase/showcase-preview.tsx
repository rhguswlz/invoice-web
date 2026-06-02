import { cn } from "@/lib/utils";

interface ShowcasePreviewProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function ShowcasePreview({
  label,
  children,
  className,
}: ShowcasePreviewProps) {
  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      {label && (
        <div className="px-4 py-2 bg-muted border-b text-sm font-medium">
          {label}
        </div>
      )}
      <div className="p-6 flex items-center justify-center min-h-[100px] flex-wrap gap-4">
        {children}
      </div>
    </div>
  );
}
