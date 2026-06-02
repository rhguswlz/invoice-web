import { cn } from "@/lib/utils";

type SectionVariant = "default" | "muted" | "dark";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: SectionVariant;
  id?: string;
}

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-background",
  muted: "bg-muted/30",
  dark: "bg-foreground text-background",
};

export function Section({
  children,
  className,
  variant = "default",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", variantStyles[variant], className)}
    >
      {children}
    </section>
  );
}
