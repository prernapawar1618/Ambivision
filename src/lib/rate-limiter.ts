/**
 * Lightweight in-memory sliding window rate limiter
 * Protects serverless and Node.js endpoints against abuse and brute force.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipRequestMap = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically to avoid memory growth
const CLEANUP_INTERVAL_MS = 1000 * 60 * 10; // 10 minutes
let lastCleanup = Date.now();

function cleanupStaleRecords() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, value] of ipRequestMap.entries()) {
    if (now > value.resetAt) {
      ipRequestMap.delete(key);
    }
  }
}

/**
 * Checks if a client IP has exceeded the allowed request threshold.
 * @param ip Client IP address or identifier
 * @param maxRequests Maximum requests allowed within windowMs
 * @param windowMs Window duration in milliseconds (default: 10 minutes)
 * @returns { allowed: boolean, remaining: number, resetInSeconds: number }
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 10 * 60 * 1000,
) {
  cleanupStaleRecords();

  const now = Date.now();
  const existing = ipRequestMap.get(ip);

  if (!existing || now > existing.resetAt) {
    ipRequestMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - existing.count,
    resetInSeconds: Math.ceil((existing.resetAt - now) / 1000),
  };
}

/**
 * Extract client IP from Next.js headers safely
 */
export function getClientIp(headers: Headers): string {
  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',');
    return ips[0].trim();
  }
  const xRealIp = headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();
  const cfConnectingIp = headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();
  return 'unknown-client';
}
