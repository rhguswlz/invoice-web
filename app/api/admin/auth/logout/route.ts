import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth";
import type { ApiResponse } from "@/types";

export async function POST(): Promise<NextResponse<ApiResponse<void>>> {
  const response = NextResponse.json({ success: true, data: undefined });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
