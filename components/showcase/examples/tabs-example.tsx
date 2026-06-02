"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function TabsExample() {
  return (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList variant="default">
        <TabsTrigger value="tab1">탭 1</TabsTrigger>
        <TabsTrigger value="tab2">탭 2</TabsTrigger>
        <TabsTrigger value="tab3">탭 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <p>첫 번째 탭의 콘텐츠입니다.</p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <p>두 번째 탭의 콘텐츠입니다.</p>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <p>세 번째 탭의 콘텐츠입니다.</p>
      </TabsContent>
    </Tabs>
  );
}

export function TabsLineExample() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="analytics">분석</TabsTrigger>
        <TabsTrigger value="reports">보고서</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <p>개요 탭의 내용입니다.</p>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <p>분석 탭의 내용입니다.</p>
      </TabsContent>
      <TabsContent value="reports" className="mt-4">
        <p>보고서 탭의 내용입니다.</p>
      </TabsContent>
    </Tabs>
  );
}
