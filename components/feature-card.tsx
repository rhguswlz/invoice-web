import {
  Code2,
  Moon,
  Palette,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { FeatureItem } from "@/types";

const iconMap = {
  Zap,
  Palette,
  Shield,
  Moon,
  Smartphone,
  Code2,
} as const;

type IconName = keyof typeof iconMap;

export function FeatureCard({ icon, title, description }: FeatureItem) {
  const Icon = iconMap[icon as IconName] ?? Zap;

  return (
    <Card className="border-border/50 transition-all duration-200 hover:border-border hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="size-6 text-primary" />
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
