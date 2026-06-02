import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/page-container";

export default function Loading() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-8 py-24">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-16 w-3/4 max-w-2xl" />
          <Skeleton className="h-8 w-1/2 max-w-xl" />
          <div className="flex gap-4">
            <Skeleton className="h-11 w-28" />
            <Skeleton className="h-11 w-28" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 p-6 border rounded-lg">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-lg" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
