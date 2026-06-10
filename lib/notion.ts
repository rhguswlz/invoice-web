/**
 * Notion API 클라이언트 초기화 모듈
 *
 * 환경 변수에서 Notion Integration Token을 읽어 클라이언트를 생성합니다.
 * 서버 사이드에서만 사용해야 합니다 (API 토큰 보호).
 */
import { Client } from "@notionhq/client";

// 환경 변수 누락 시 빌드 타임에 오류를 발생시켜 빠른 피드백 제공
if (!process.env.NOTION_API_TOKEN) {
  throw new Error(
    "환경 변수 NOTION_API_TOKEN이 설정되지 않았습니다. .env.local 파일을 확인하세요."
  );
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error(
    "환경 변수 NOTION_DATABASE_ID가 설정되지 않았습니다. .env.local 파일을 확인하세요."
  );
}

if (!process.env.NOTION_ITEMS_DATABASE_ID) {
  throw new Error(
    "환경 변수 NOTION_ITEMS_DATABASE_ID가 설정되지 않았습니다. .env.local 파일을 확인하세요."
  );
}

/**
 * Notion API 클라이언트 싱글톤 인스턴스
 * Next.js 서버 컴포넌트 및 Route Handler에서 import하여 사용합니다.
 */
export const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
});

/**
 * 견적서(Invoices)가 저장된 Notion 데이터베이스 ID
 */
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

/**
 * 견적서 품목(Items)이 저장된 별도 Notion 데이터베이스 ID
 * 품목은 Invoices DB와 Relation으로 연결된 독립 데이터베이스입니다.
 */
export const NOTION_ITEMS_DATABASE_ID = process.env.NOTION_ITEMS_DATABASE_ID;
