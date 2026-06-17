// Web Crypto API를 사용한 HMAC-SHA256 기반 세션 토큰 생성/검증
// Edge Runtime 호환 (Node.js crypto 미사용)

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24; // 24시간

export async function generateSessionToken(
  password: string,
  secret: string
): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(password);

  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    messageData
  );

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifySessionToken(
  token: string,
  password: string,
  secret: string
): Promise<boolean> {
  const expectedToken = await generateSessionToken(password, secret);
  return token === expectedToken;
}
