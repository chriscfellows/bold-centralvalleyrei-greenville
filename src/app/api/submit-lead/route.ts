/**
 * Lead Submission API Route — POST /api/submit-lead
 * 
 * Flow:
 * 1. Validate required fields (name, email, phone, address)
 * 2. Run spam protection checks (honeypot, timing, rate limit)
 * 3. Submit to BLP via BullMQ lead-ingestion queue
 * 4. On queue failure: send error email + insert notification (handleLeadError)
 * 5. Always return 200 to client — seller never sees backend errors
 *    (redirect to /thank-you happens client-side on any non-error response)
 * 
 * Spec refs: LD-001 through LD-007, SP-001 through SP-007, Must Do #1, Must Not #5
 */

import { NextRequest, NextResponse } from "next/server";
import { submitLead, handleLeadError } from "@boldstreet/shared";
import { checkSpamProtection } from "@boldstreet/shared";
import { WEBSITE_ID } from "@/config/site";
import { lookupPhone } from "@/lib/twilioLookup";

export async function POST(request: NextRequest) {
  let body: Record<string, string>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    address,
    info,
    website_url, // honeypot field
    _loaded_at,  // timing field
    gclid,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
  } = body;

  // ─── Spam Protection ───
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const spamCheck = checkSpamProtection(website_url, _loaded_at, clientIp);
  if (spamCheck.blocked) {
    // Log internally but return 200 — seller never sees spam rejection
    console.log(`[SubmitLead] Spam check blocked: ${spamCheck.reason} from ${clientIp}`);
    // Still redirect to thank you — don't leak detection
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // ─── Field Validation ───
  const missing: string[] = [];
  if (!name?.trim()) missing.push("name");
  if (!email?.trim()) missing.push("email");
  if (!phone?.trim()) missing.push("phone");
  if (!address?.trim()) missing.push("address");

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // ─── Twilio Phone Validation ───
  const phoneIntelligence = await lookupPhone(phone.trim());

  if (!phoneIntelligence.lookupFailed && !phoneIntelligence.valid) {
    // Twilio confirmed the number is invalid — return user-facing error
    console.log(`[SubmitLead] Phone validation failed for: ${phone}`);
    return NextResponse.json(
      { error: "Please enter a valid phone number so we can reach you." },
      { status: 422 }
    );
  }

  // ─── Build Lead Ingestion Message ───
  const leadData = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    address: address.trim(),
    info: info?.trim() || undefined,
    website_id: WEBSITE_ID(),
    ...(gclid && { gclid }),
    ...(utm_source && { utm_source }),
    ...(utm_medium && { utm_medium }),
    ...(utm_campaign && { utm_campaign }),
    ...(utm_term && { utm_term }),
    ...(utm_content && { utm_content }),
    // Phone intelligence (null if lookup failed or fields not returned)
    phone_valid: phoneIntelligence.lookupFailed ? null : phoneIntelligence.valid,
    phone_calling_country_code: phoneIntelligence.callingCountryCode ?? null,
    phone_country_code: phoneIntelligence.countryCode ?? null,
    phone_national_format: phoneIntelligence.nationalFormat ?? null,
    phone_line_type: phoneIntelligence.lineType ?? null,
    phone_carrier_name: phoneIntelligence.carrierName ?? null,
    phone_mobile_country_code: phoneIntelligence.mobileCountryCode ?? null,
    phone_mobile_network_code: phoneIntelligence.mobileNetworkCode ?? null,
    phone_error_code: phoneIntelligence.errorCode ?? null,
  };

  // ─── Submit to BullMQ Queue ───
  try {
    await submitLead(leadData);
    console.log(`[SubmitLead] Lead submitted successfully for website_id=${WEBSITE_ID()}`);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    // Queue failed — trigger error fallback (email + notification)
    console.error("[SubmitLead] Queue submission failed:", error);
    await handleLeadError(leadData, error);
    // Return 200 — client always redirects to thank you
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
