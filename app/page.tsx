/**
 * 홈 랜딩 페이지 (서버 컴포넌트)
 *
 * 서비스 소개와 노션 연동 방법을 안내하고,
 * 견적서 목록 페이지로 이동하는 진입점 역할을 합니다.
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Link2, Download, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 space-y-16">
      {/* 히어로 섹션 */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          노션 기반 견적서 서비스
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          노션으로 작성한 견적서를
          <br />
          <span className="text-primary">웹에서 바로 공유하세요</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          노션 데이터베이스에 견적서를 입력하면, 클라이언트가 웹 브라우저에서
          바로 확인하고 PDF로 다운로드할 수 있습니다.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/invoices">
              견적서 목록 보기 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 서비스 흐름 안내 */}
      <section className="space-y-6">
        <h2 className="text-center text-2xl font-bold">이렇게 사용하세요</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">1. 노션에 입력</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              노션 데이터베이스에 견적서 정보를 입력합니다.
              품목, 수량, 단가, 고객 정보 등을 작성하세요.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Link2 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">2. 링크 공유</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              견적서 뷰어 페이지의 링크를 클라이언트에게 전달합니다.
              별도의 공개 설정 없이 바로 공유 가능합니다.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">3. 웹에서 확인·저장</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              클라이언트가 링크를 열면 견적서를 바로 확인하고
              PDF로 다운로드할 수 있습니다.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 노션 연동 설정 안내 */}
      <section className="rounded-xl border bg-muted/40 p-8 space-y-4">
        <h2 className="text-xl font-bold">노션 연동 설정 방법</h2>
        <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
          <li>
            <a
              href="https://www.notion.so/my-integrations"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              노션 인테그레이션 페이지
            </a>
            에서 새 인테그레이션을 생성하고 토큰을 복사합니다.
          </li>
          <li>
            견적서를 저장할 노션 데이터베이스를 만들고, 해당 데이터베이스에
            인테그레이션 권한을 부여합니다.
          </li>
          <li>
            프로젝트 루트에{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env.local</code>{" "}
            파일을 생성하고 아래 환경 변수를 입력합니다.
          </li>
        </ol>
        <pre className="rounded-lg bg-muted p-4 text-xs font-mono overflow-x-auto">
          {`NOTION_API_TOKEN=secret_xxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000`}
        </pre>
      </section>
    </div>
  );
}
