"use client";
/**
 * LeadCaptureForm — Client component (requires state for form handling).
 * Includes all spam protection hidden fields and UTM/gclid hidden fields.
 * Reads UTM params from localStorage (90-day window per CA resolution #8).
 * Submits to local Next.js API route — never directly to external APIs or DB.
 *
 * Spec refs: LD-001, SP-001 through SP-004, UTM-002, UTM-003
 *
 * Required fields: name, phone, email, address (notes field removed per UX feedback)
 * Validation: explicit client-side checks with inline error messages before submit
 */
import { useState, useEffect, useRef } from "react";

interface LeadCaptureFormProps {
  websiteId: number;
  metroArea: string;
  ctaText?: string;
  compact?: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface UTMData {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const UTM_STORAGE_KEY = "bs_utm_params";
const UTM_EXPIRY_DAYS = 90;

function readUTMFromStorage(): UTMData {
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { data: UTMData; timestamp: number };
    const ageMs = Date.now() - parsed.timestamp;
    if (ageMs > UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(UTM_STORAGE_KEY);
      return {};
    }
    return parsed.data;
  } catch {
    return {};
  }
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 10;
}

export function LeadCaptureForm({ websiteId, metroArea, ctaText, compact }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [utmData, setUtmData] = useState<UTMData>({});
  const [loadedAt, setLoadedAt] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setLoadedAt(String(Date.now()));
    setUtmData(readUTMFromStorage());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    if (!formData.address.trim()) errors.address = "Property address is required.";
    if (!formData.name.trim()) errors.name = "Your name is required.";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        website_id: websiteId,
        _loaded_at: loadedAt,
        website_url: "", // honeypot — must remain empty
        ...utmData,
      };
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 422) {
        // Twilio confirmed the phone number is invalid — show inline error
        const data = await res.json().catch(() => ({}));
        setFieldErrors((prev) => ({
          ...prev,
          phone: data.error || "Please enter a valid phone number so we can reach you.",
        }));
        setIsSubmitting(false);
        return;
      }

      // All other responses (200, 4xx, 5xx) — redirect to thank-you (zero lead loss)
      window.location.href = "/thank-you";
    } catch {
      window.location.href = "/thank-you";
    }
  };

  const inputBase = "w-full rounded-lg border px-4 py-3 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors";
  const inputNormal = `${inputBase} border-gray-300 focus:border-[#0F172A] focus:ring-[#0F172A]/20`;
  const inputErr = `${inputBase} border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50`;

  return (
    <div id="lead-form" className={`bg-white rounded-2xl shadow-xl border border-[#0F172A]/10 ${compact ? "p-6" : "p-8"}`}>
      <div className="text-center mb-6">
        <h3 className={`font-bold text-[#0F172A] ${compact ? "text-xl" : "text-2xl"}`}>
          {ctaText || "Get Your Free Cash Offer!"}
        </h3>
        <p className="text-sm text-gray-500 mt-1">No obligation. No pressure. Close in as little as 7 days.</p>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Honeypot — SP-001: hidden via CSS, not display:none */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          <label htmlFor="website_url">Website URL</label>
          <input type="text" id="website_url" name="website_url" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
        {/* Hidden fields */}
        <input type="hidden" name="_loaded_at" value={loadedAt} />
        <input type="hidden" name="gclid" value={utmData.gclid || ""} />
        <input type="hidden" name="utm_source" value={utmData.utm_source || ""} />
        <input type="hidden" name="utm_medium" value={utmData.utm_medium || ""} />
        <input type="hidden" name="utm_campaign" value={utmData.utm_campaign || ""} />
        <input type="hidden" name="utm_term" value={utmData.utm_term || ""} />
        <input type="hidden" name="utm_content" value={utmData.utm_content || ""} />

        {/* Property Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-[#0F172A] mb-1">
            Property Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="address" name="address"
            placeholder={`123 Main St, ${metroArea}, FL`}
            value={formData.address} onChange={handleChange}
            className={fieldErrors.address ? inputErr : inputNormal}
            aria-invalid={!!fieldErrors.address}
            aria-describedby={fieldErrors.address ? "address-error" : undefined}
          />
          {fieldErrors.address && (
            <p id="address-error" className="mt-1 text-xs text-red-600">{fieldErrors.address}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#0F172A] mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text" id="name" name="name" placeholder="John Smith"
            value={formData.name} onChange={handleChange}
            className={fieldErrors.name ? inputErr : inputNormal}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {fieldErrors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#0F172A] mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel" id="phone" name="phone" placeholder="(407) 555-0123"
            value={formData.phone} onChange={handleChange}
            className={fieldErrors.phone ? inputErr : inputNormal}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
          />
          {fieldErrors.phone && (
            <p id="phone-error" className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email" id="email" name="email" placeholder="john@example.com"
            value={formData.email} onChange={handleChange}
            className={fieldErrors.email ? inputErr : inputNormal}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-[#E8521A] px-6 py-4 text-base font-bold text-white shadow-md hover:bg-[#E8521A]/90 hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Get My Free Cash Offer →"}
        </button>
        <p className="text-xs text-center text-gray-400">
          By submitting, you consent to be contacted by phone, email, and/or text.
          Your information is secure and never shared.
        </p>
      </form>
    </div>
  );
}
