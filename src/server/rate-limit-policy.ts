import { isIP } from "node:net";

export function rateLimitAllowed(attempts: number, limit: number) {
  return attempts <= limit;
}

export function clientIpFromHeaders(realIp: string | null | undefined, forwardedFor: string | null | undefined) {
  const candidates = [realIp?.trim(), forwardedFor?.split(",")[0]?.trim()];
  return candidates.find((candidate): candidate is string => Boolean(candidate && candidate.length <= 64 && isIP(candidate))) ?? null;
}
