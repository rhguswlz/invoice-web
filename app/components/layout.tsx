import { ComponentSidebar } from "@/components/showcase/component-sidebar";
import { PageContainer } from "@/components/layout/page-container";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer className="py-8">
      <div className="flex gap-8">
        <ComponentSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </PageContainer>
  );
}
