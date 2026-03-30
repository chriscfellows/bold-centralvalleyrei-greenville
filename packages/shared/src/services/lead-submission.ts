/**
 * Lead Submission Service
 * Publishes lead data to BLP's lead-ingestion BullMQ queue.
 * On failure: sends error email to chris@boldstreet.ai via SendGrid
 *             AND inserts error row into BLP's notifications table.
 * The seller NEVER sees a backend error — always redirect to thank you page.
 *
 * Spec refs: LD-001 through LD-007, Must Do #1 (zero lead loss), Must Not #5 (no fire-and-forget)
 */

import { Queue, QueueEvents } from "bullmq";
import sgMail from "@sendgrid/mail";
import { getDb } from "../db/connection";
import { notifications } from "@boldstreet/db-schema";

// ─── Types ───

export interface LeadIngestionMessage {
  name: string;
  email: string;
  phone: string;
  address: string;
  info?: string;
  website_id: number;
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  // Twilio Lookup v2 — Phone Intelligence (optional)
  phone_valid?: boolean | null;
  phone_calling_country_code?: string | null;
  phone_country_code?: string | null;
  phone_national_format?: string | null;
  phone_line_type?: string | null;
  phone_carrier_name?: string | null;
  phone_mobile_country_code?: string | null;
  phone_mobile_network_code?: string | null;
  phone_error_code?: string | null;
}

export interface LeadIngestionResult {
  lead_id: number;
  status: "accepted";
}

export interface LeadSubmissionError {
  message: string;
  code: string;
  timestamp: string;
}

// ─── Queue Name (must match BLP's QUEUE_NAMES.LEAD_INGESTION) ───
const LEAD_INGESTION_QUEUE = "lead-ingestion";

// ─── Redis Connection (lazy-initialized) ───
let _queue: Queue | null = null;
let _queueEvents: QueueEvents | null = null;

function parseRedisUrl(url: string) {
  const parsed = new URL(url);
  const opts: Record<string, unknown> = {
    host: parsed.hostname,
    port: parseInt(parsed.port || "6379"),
    maxRetriesPerRequest: null, // required by BullMQ
  };
  if (parsed.password) opts.password = parsed.password;
  if (parsed.username && parsed.username !== "default") opts.username = parsed.username;
  if (parsed.protocol === "rediss:") opts.tls = {};
  return opts;
}

function getQueue(): Queue | null {
  if (_queue) return _queue;
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    console.warn("[LeadSubmission] REDIS_URL not set — queue unavailable");
    return null;
  }
  try {
    const connection = parseRedisUrl(redisUrl);
    _queue = new Queue(LEAD_INGESTION_QUEUE, { connection });
    return _queue;
  } catch (err) {
    console.error("[LeadSubmission] Failed to connect to Redis:", err);
    return null;
  }
}

function getQueueEvents(): QueueEvents | null {
  if (_queueEvents) return _queueEvents;
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) return null;
  try {
    const connection = parseRedisUrl(redisUrl);
    _queueEvents = new QueueEvents(LEAD_INGESTION_QUEUE, { connection });
    return _queueEvents;
  } catch (err) {
    console.error("[LeadSubmission] Failed to create QueueEvents:", err);
    return null;
  }
}

// ─── Main Submit Function ───

/**
 * Submit a lead to BLP via the lead-ingestion BullMQ queue.
 * Waits for BLP worker confirmation via job.waitUntilFinished() (30s timeout).
 * Throws on failure — caller must catch and call handleLeadError().
 *
 * Spec ref: LD-002, LD-003, LD-004, Must Not #5
 */
export async function submitLead(data: LeadIngestionMessage): Promise<LeadIngestionResult> {
  const queue = getQueue();
  if (!queue) {
    throw new Error("Redis queue unavailable — REDIS_URL not configured or connection failed");
  }

  const queueEvents = getQueueEvents();
  if (!queueEvents) {
    throw new Error("QueueEvents unavailable — cannot confirm lead processing");
  }

  // Publish to lead-ingestion queue
  const job = await queue.add("ingest", data, {
    attempts: 1, // Lead gen site publishes once; BLP worker handles retries
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  });

  console.log(`[LeadSubmission] Job ${job.id} published for website_id=${data.website_id}`);

  // Wait for BLP worker confirmation (30-second timeout per spec)
  const result = await job.waitUntilFinished(queueEvents, 30_000) as LeadIngestionResult;

  console.log(`[LeadSubmission] Job ${job.id} confirmed: lead_id=${result.lead_id}`);
  return result;
}

// ─── Error Fallback ───

/**
 * Handle lead submission failure.
 * (a) Sends error email to chris@boldstreet.ai via SendGrid with full lead data.
 * (b) Inserts error row into BLP's notifications table so it appears in admin alerts.
 * Both paths are attempted independently — failure of one doesn't block the other.
 *
 * Spec ref: LD-005, Must Do #1 (zero lead loss), Must Not #5
 */
export async function handleLeadError(
  data: LeadIngestionMessage,
  error: unknown
): Promise<void> {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const timestamp = new Date().toISOString();

  console.error(`[LeadSubmission] Lead capture failed for website_id=${data.website_id}:`, errorMessage);

  // Path A: Send error email to chris@boldstreet.ai via SendGrid
  await sendErrorEmail(data, errorMessage, timestamp);

  // Path B: Insert error into BLP's notifications table
  await insertErrorNotification(data, errorMessage, timestamp);
}

async function sendErrorEmail(
  data: LeadIngestionMessage,
  errorMessage: string,
  timestamp: string
): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error("[LeadSubmission] SENDGRID_API_KEY not set — cannot send error email");
    return;
  }

  try {
    sgMail.setApiKey(apiKey);
    await sgMail.send({
      to: "chris@boldstreet.ai",
      from: "chris@boldstreet.ai",
      subject: `[LEAD CAPTURE FAILED] website_id=${data.website_id} — ${timestamp}`,
      html: `
        <h2>Lead Capture Failed — Manual Processing Required</h2>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <p><strong>Error:</strong> ${errorMessage}</p>
        <hr/>
        <h3>Lead Data</h3>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
          <tr><td><strong>Address</strong></td><td>${data.address}</td></tr>
          <tr><td><strong>Info</strong></td><td>${data.info || "(none)"}</td></tr>
          <tr><td><strong>Website ID</strong></td><td>${data.website_id}</td></tr>
          <tr><td><strong>gclid</strong></td><td>${data.gclid || "(none)"}</td></tr>
          <tr><td><strong>utm_source</strong></td><td>${data.utm_source || "(none)"}</td></tr>
          <tr><td><strong>utm_medium</strong></td><td>${data.utm_medium || "(none)"}</td></tr>
          <tr><td><strong>utm_campaign</strong></td><td>${data.utm_campaign || "(none)"}</td></tr>
          <tr><td><strong>utm_term</strong></td><td>${data.utm_term || "(none)"}</td></tr>
          <tr><td><strong>utm_content</strong></td><td>${data.utm_content || "(none)"}</td></tr>
        </table>
        <p><em>This lead was NOT saved to BLP automatically. Please add it manually.</em></p>
      `,
    });
    console.log("[LeadSubmission] Error email sent to chris@boldstreet.ai");
  } catch (emailError) {
    console.error("[LeadSubmission] Failed to send error email:", emailError);
  }
}

async function insertErrorNotification(
  data: LeadIngestionMessage,
  errorMessage: string,
  timestamp: string
): Promise<void> {
  try {
    const db = getDb();
    await db.insert(notifications).values({
      type: "error",
      title: "Lead capture failed",
      message: `Lead from website_id=${data.website_id} failed at ${timestamp}.\n\nError: ${errorMessage}\n\nLead data: name=${data.name}, email=${data.email}, phone=${data.phone}, address=${data.address}`,
      clientId: data.website_id, // website_id stored in client_id per spec LD-005
      isRead: false,
    });
    console.log("[LeadSubmission] Error notification inserted into BLP notifications table");
  } catch (dbError) {
    console.error("[LeadSubmission] Failed to insert error notification:", dbError);
  }
}
