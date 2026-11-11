import { createHmac, timingSafeEqual } from "node:crypto";

const SIGNATURE_PREFIX = "sha256=";
const SHA256_HEX_LENGTH = 64;

export function createFacebookSignature(rawBody: string, appSecret: string): string {
  const digest = createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");

  return `${SIGNATURE_PREFIX}${digest}`;
}

export function secureTextEquals(first: string, second: string): boolean {
  const firstBuffer = Buffer.from(first, "utf8");
  const secondBuffer = Buffer.from(second, "utf8");

  if (firstBuffer.length !== secondBuffer.length) return false;

  return timingSafeEqual(firstBuffer, secondBuffer);
}

export function verifyFacebookSignature({
  rawBody,
  signatureHeader,
  appSecret,
}: {
  rawBody: string;
  signatureHeader: string | null;
  appSecret: string;
}): boolean {
  if (!signatureHeader?.startsWith(SIGNATURE_PREFIX)) return false;

  const suppliedDigest = signatureHeader.slice(SIGNATURE_PREFIX.length);

  if (suppliedDigest.length !== SHA256_HEX_LENGTH || !/^[a-f0-9]+$/iu.test(suppliedDigest)) {
    return false;
  }

  const expectedSignature = createFacebookSignature(rawBody, appSecret);

  return secureTextEquals(signatureHeader.toLowerCase(), expectedSignature);
}
