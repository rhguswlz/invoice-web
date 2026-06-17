import { NextRequest, NextResponse } from "next/server";
import { generateSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export const config = {
  matcher: ["/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin/login은 미들웨어 검증 제외
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const authSecret = process.env.AUTH_SECRET;

  if (!adminPassword || !authSecret) {
    console.error(
      "관리자 환경변수 누락: ADMIN_PASSWORD, AUTH_SECRET이 필요합니다"
    );
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 쿠키에서 세션 토큰 검증
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 저장된 토큰이 유효한지 확인
  const expectedToken = await generateSessionToken(adminPassword, authSecret);

  if (sessionToken !== expectedToken) {
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}
