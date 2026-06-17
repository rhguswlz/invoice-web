import { NextRequest, NextResponse } from "next/server";
import { generateSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth";
import type { ApiResponse } from "@/types";

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<void>>> {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const authSecret = process.env.AUTH_SECRET;

    if (!adminPassword || !authSecret) {
      return NextResponse.json(
        { success: false, error: "서버 설정 오류: 관리자 환경변수 누락" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { password } = body as { password: string };

    if (!password) {
      return NextResponse.json(
        { success: false, error: "비밀번호를 입력해주세요" },
        { status: 400 }
      );
    }

    // 제출된 비밀번호로 토큰 생성
    const sessionToken = await generateSessionToken(password, authSecret);
    // 환경변수 비밀번호로 토큰 생성
    const expectedToken = await generateSessionToken(adminPassword, authSecret);

    // 토큰 비교
    if (sessionToken !== expectedToken) {
      return NextResponse.json(
        { success: false, error: "비밀번호가 올바르지 않습니다" },
        { status: 401 }
      );
    }

    // 쿠키 설정
    const response = NextResponse.json({ success: true, data: undefined });
    response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("로그인 API 오류:", error);
    return NextResponse.json(
      { success: false, error: "로그인 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
