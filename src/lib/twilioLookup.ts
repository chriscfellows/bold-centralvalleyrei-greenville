/**
 * Twilio Lookup v2 — Phone Validation Service
 *
 * Validates a phone number using Twilio's Lookup v2 API with Line Type Intelligence.
 * https://www.twilio.com/docs/lookup/v2-api/line-type-intelligence
 *
 * Behavior:
 * - On success with valid number: returns phone intelligence fields
 * - On success with invalid number: returns { valid: false } — caller should reject the lead
 * - On API failure (network, auth, timeout): returns { lookupFailed: true } — caller should proceed
 *
 * Environment variables required:
 *   TWILIO_ACCOUNT_SID
 *   TWILIO_AUTH_TOKEN
 */

export interface TwilioPhoneIntelligence {
  valid: boolean;
  callingCountryCode?: string | null;
  countryCode?: string | null;
  nationalFormat?: string | null;
  lineType?: string | null;
  carrierName?: string | null;
  mobileCountryCode?: string | null;
  mobileNetworkCode?: string | null;
  errorCode?: string | null;
  lookupFailed?: boolean; // true when the API call itself failed — proceed without validation
}

export async function lookupPhone(phone: string): Promise<TwilioPhoneIntelligence> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  // Diagnostic log — shows first 4 chars to confirm presence without exposing secrets
  console.log(
    `[TwilioLookup] SID=${accountSid ? accountSid.slice(0, 4) + "..." : "MISSING"} ` +
    `TOKEN=${authToken ? authToken.slice(0, 4) + "..." : "MISSING"} ` +
    `phone=${phone}`
  );

  if (!accountSid?.trim() || !authToken?.trim()) {
    console.warn("[TwilioLookup] TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set or empty — skipping lookup");
    return { valid: true, lookupFailed: true };
  }

  const encodedPhone = encodeURIComponent(phone.trim());
  const url = `https://lookups.twilio.com/v2/PhoneNumbers/${encodedPhone}?Fields=line_type_intelligence`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(8000), // 8-second timeout
    });

    if (!response.ok) {
      // 404 = number not found / invalid format
      if (response.status === 404) {
        console.log(`[TwilioLookup] Phone not found (404): ${phone}`);
        return { valid: false, errorCode: "NOT_FOUND" };
      }
      // Other HTTP errors — treat as lookup failure, proceed
      console.warn(`[TwilioLookup] HTTP ${response.status} for ${phone} — proceeding without validation`);
      return { valid: true, lookupFailed: true };
    }

    const data = await response.json();

    // Twilio returns valid: false for numbers that exist but are invalid
    if (!data.valid) {
      console.log(`[TwilioLookup] Phone invalid per Twilio: ${phone}`);
      return {
        valid: false,
        callingCountryCode: data.calling_country_code ?? null,
        countryCode: data.country_code ?? null,
        nationalFormat: data.national_format ?? null,
        errorCode: data.line_type_intelligence?.error_code?.toString() ?? null,
      };
    }

    const lti = data.line_type_intelligence;

    console.log(`[TwilioLookup] Phone valid: ${phone} | type=${lti?.type} | carrier=${lti?.carrier_name}`);

    return {
      valid: true,
      callingCountryCode: data.calling_country_code ?? null,
      countryCode: data.country_code ?? null,
      nationalFormat: data.national_format ?? null,
      lineType: lti?.type ?? null,
      carrierName: lti?.carrier_name ?? null,
      mobileCountryCode: lti?.mobile_country_code ?? null,
      mobileNetworkCode: lti?.mobile_network_code ?? null,
      errorCode: lti?.error_code?.toString() ?? null,
    };
  } catch (err) {
    // Network error, timeout, or parse failure — proceed without blocking the lead
    console.error("[TwilioLookup] Lookup failed — proceeding without phone validation:", err);
    return { valid: true, lookupFailed: true };
  }
}
