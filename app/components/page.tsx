import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { COMPONENT_ITEMS } from "@/lib/component-showcase";

export default function ComponentsPage() {
  const shadcnItems = COMPONENT_ITEMS.filter((c) => c.category === "shadcn");
  const customItems = COMPONENT_ITEMS.filter((c) => c.category === "custom");

  return (
    <div className="space-y-12">
      {/* 헤더 */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">컴포넌트 라이브러리</h1>
        <p className="text-lg text-muted-foreground mt-2">
          shadcn/ui와 커스텀 컴포넌트 예제를 모두 확인하세요.
        </p>
      </div>

      {/* shadcn/ui 섹션 */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">shadcn/ui</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Radix UI와 Tailwind CSS 기반의 고급 컴포넌트
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shadcnItems.map((item) => (
            <Link key={item.slug} href={`/components/${item.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{item.label}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 커스텀 섹션 */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">커스텀 컴포넌트</h2>
          <p className="text-sm text-muted-foreground mt-1">
            프로젝트에서 만든 재사용 가능한 커스텀 컴포넌트
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customItems.map((item) => (
            <Link key={item.slug} href={`/components/${item.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{item.label}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
