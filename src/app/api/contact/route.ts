import { NextResponse } from "next/server";

// SP//DEV Signal Transmission endpoint.
// - Input validation & sanitization
// - In-memory per-IP rate limiting (no external dependency)
// - Optional email delivery via Resend (REST) or a custom webhook; degrades gracefully
//   to local logging if neither is configured.

const MAX_NAME = 80;
const MAX_MESSAGE = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

function sanitize(input: unknown, maxLength: number): string {
  const str = String(input ?? "").replace(/<[^>]*>|<\/?[a-zA-Z][^>]*>/g, " ").replace(/[<>]/g, " ").trim();
  return str.slice(0, maxLength);
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown-client";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + RATE_WINDOW_MS;
  }
  record.count += 1;
  ipRequestCounts.set(ip, record);
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

async function deliverViaResend(payload: { name: string; email: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const from = process.env.RESEND_FROM || "Portfolio Signal <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO || payload.email;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: `[SP//DEV SIGNAL] ${payload.name}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`,
      tags: [{ name: "source", value: "portfolio-contact" }]
    })
  });

  return res.ok;
}

async function deliverViaWebhook(payload: { name: string; email: string; message: string }) {
  const webhook = process.env.CONTACT_WEBHOOK;
  if (!webhook) return null;

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, source: "spidey-portfolio" })
  });

  return res.ok;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many transmissions. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON payload." }, { status: 400 });
    }

    // Honeypot: if a bot filled the hidden field, silently accept but do nothing.
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Signal transmitted successfully to Prathik Salla." });
    }

    const name = sanitize(body.name, MAX_NAME);
    const email = String(body.email ?? "").trim().toLowerCase();
    const message = sanitize(body.message, MAX_MESSAGE);

    if (!name || !message) {
      return NextResponse.json({ success: false, error: "Name and message are required." }, { status: 400 });
    }
    if (email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json({ success: false, error: "Please provide a valid email address." }, { status: 400 });
    }
    if (name.length < 2) {
      return NextResponse.json({ success: false, error: "Name must be at least 2 characters." }, { status: 400 });
    }

    const payload = { name, email, message };

    // Best-effort delivery chain: Resend → webhook → local log.
    let delivered = false;
    try {
      const resendResult = await deliverViaResend(payload);
      if (resendResult !== null) delivered = resendResult;
    } catch {
      // fall through to webhook / log
    }

    if (!delivered) {
      try {
        const webhookResult = await deliverViaWebhook(payload);
        if (webhookResult !== null) delivered = webhookResult;
      } catch {
        // fall through to local log
      }
    }

    if (!delivered) {
      console.log(
        `[SP//DEV SIGNAL RECEIVED] From: ${name} (${email}) - Message: ${message.replace(/\s+/g, " ").slice(0, 240)}`
      );
    }

    return NextResponse.json({
      success: true,
      message: "Signal transmitted successfully to Prathik Salla.",
      delivery: delivered ? "delivered" : "queued"
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to process contact signal." }, { status: 500 });
  }
}