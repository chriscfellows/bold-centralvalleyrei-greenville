/**
 * Spam Protection Middleware
 * Three layers per spec:
 * (a) Honeypot hidden field — SP-001, SP-002
 * (b) Page-load timestamp — SP-003, SP-004
 * (c) IP rate limiting — SP-005, SP-006 (20/hr per Constraint Architecture Gap #5)
 *
 * All rejections return generic errors — no detection leakage (SP-007).
 * Must Not #2: honeypot is CSS-hidden (not display:none), threshold is 3s not aggressive.
 */

export interface SpamCheckResult {
  blocked: boolean;
  status: 400 | 429;
  reason?: string; // internal only — never sent to client
}

// ─── IP Rate Limiter (in-memory, 20/hr per Constraint Architecture resolution #5) ───
const ipSubmissions = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT = 20; // submissions per hour (updated from 3 per CA resolution #5)
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipSubmissions.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    // New window
    ipSubmissions.set(ip, { count: 1, windowStart: now });
    return true; // allowed
  }

  if (entry.count >= RATE_LIMIT) {
    return false; // blocked
  }

  entry.count++;
  return true; // allowed
}

// ─── Main Check Function ───

/**
 * Check all spam protection layers.
 * Call this in the Next.js API route before processing the lead.
 *
 * @param honeypotValue - value of the hidden `website_url` field (must be empty)
 * @param loadedAt - Unix timestamp (ms) when the form page loaded
 * @param ip - client IP address
 */
export function checkSpamProtection(
  honeypotValue: string | undefined,
  loadedAt: string | undefined,
  ip: string
): SpamCheckResult {
  // SP-001/SP-002: Honeypot check
  if (honeypotValue && honeypotValue.trim() !== "") {
    return { blocked: true, status: 400, reason: "honeypot_triggered" };
  }

  // SP-003/SP-004: Timing check — reject if < 3 seconds since page load
  if (loadedAt) {
    const loadTime = parseInt(loadedAt, 10);
    if (!isNaN(loadTime)) {
      const elapsed = Date.now() - loadTime;
      if (elapsed < 3000) {
        return { blocked: true, status: 400, reason: "too_fast" };
      }
    }
  }

  // SP-005/SP-006: IP rate limiting (20/hr)
  if (!checkRateLimit(ip)) {
    return { blocked: true, status: 429, reason: "rate_limited" };
  }

  return { blocked: false, status: 400 };
}
