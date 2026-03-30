"use client";
/**
 * UTMCapture — Client component.
 * Captures gclid and UTM params from URL on first page load.
 * Stores to localStorage with 90-day expiry (first-touch attribution).
 * Does NOT overwrite existing params if already stored (first-touch model).
 * Spec refs: UTM-001, UTM-002, UTM-003, UTM-004, CA resolution #8
 */

import { useEffect } from "react";

const UTM_STORAGE_KEY = "bs_utm_params";
const UTM_EXPIRY_DAYS = 90;

export function UTMCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const gclid = params.get("gclid");
      const utm_source = params.get("utm_source");
      const utm_medium = params.get("utm_medium");
      const utm_campaign = params.get("utm_campaign");
      const utm_term = params.get("utm_term");
      const utm_content = params.get("utm_content");

      // Only capture if at least one UTM param or gclid is present
      if (!gclid && !utm_source && !utm_medium && !utm_campaign && !utm_term && !utm_content) {
        return;
      }

      // First-touch: don't overwrite if already stored and not expired
      const existing = localStorage.getItem(UTM_STORAGE_KEY);
      if (existing) {
        try {
          const parsed = JSON.parse(existing) as { data: unknown; timestamp: number };
          const ageMs = Date.now() - parsed.timestamp;
          if (ageMs < UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
            return; // Already have valid first-touch data
          }
        } catch {
          // Corrupted data — overwrite
        }
      }

      const data = {
        ...(gclid && { gclid }),
        ...(utm_source && { utm_source }),
        ...(utm_medium && { utm_medium }),
        ...(utm_campaign && { utm_campaign }),
        ...(utm_term && { utm_term }),
        ...(utm_content && { utm_content }),
      };

      localStorage.setItem(
        UTM_STORAGE_KEY,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch {
      // localStorage unavailable — silently fail
    }
  }, []);

  return null;
}
