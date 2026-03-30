/**
 * UTM / gclid tracking parameter types.
 * Spec ref: UTM-001 through UTM-004
 */
export interface UTMParams {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}
