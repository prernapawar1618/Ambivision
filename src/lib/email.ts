/**
 * AmbiVision Transactional Email Service
 * 
 * Target recipient: prernapawar1618@ambivision.in
 * Supports Resend REST API and standard SMTP via Nodemailer.
 * Verified sender address used; visitor's email set as Reply-To.
 */

import nodemailer from 'nodemailer';

export interface EmailPayload {
  to?: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  attachments?: {
    filename: string;
    content: string; // base64 string
    contentType?: string;
  }[];
}

export interface EmailSendResult {
  success: boolean;
  provider: 'resend' | 'smtp' | 'none';
  id?: string;
  status: 'accepted' | 'unconfigured' | 'failed';
  error?: string;
}

export const DEFAULT_RECIPIENT = 'prernapawar1618@ambivision.in';

/**
 * Dispatches an email via Resend REST API
 */
async function sendViaResend(
  apiKey: string,
  payload: EmailPayload,
): Promise<EmailSendResult> {
  const fromAddress =
    process.env.EMAIL_FROM || 'AmbiVision <onboarding@resend.dev>';
  const targetRecipient = payload.to || DEFAULT_RECIPIENT;

  const body: Record<string, unknown> = {
    from: fromAddress,
    to: [targetRecipient],
    reply_to: payload.replyTo,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  };

  if (payload.attachments && payload.attachments.length > 0) {
    body.attachments = payload.attachments.map((att) => ({
      filename: att.filename,
      content: att.content,
    }));
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg =
        data?.message || data?.error || `Resend API returned status ${response.status}`;
      return {
        success: false,
        provider: 'resend',
        status: 'failed',
        error: errorMsg,
      };
    }

    return {
      success: true,
      provider: 'resend',
      id: data?.id,
      status: 'accepted',
    };
  } catch (err: unknown) {
    return {
      success: false,
      provider: 'resend',
      status: 'failed',
      error: err instanceof Error ? err.message : 'Network error reaching Resend API',
    };
  }
}

/**
 * Dispatches an email via Nodemailer SMTP
 */
async function sendViaSmtp(payload: EmailPayload): Promise<EmailSendResult> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Strict SMTP server compliance: mail servers reject messages if the 'from' address
  // does not match the authenticated login account. We use the user's authenticated address:
  const fromAddress = user
    ? `"AmbiVision Notifications" <${user}>`
    : (process.env.EMAIL_FROM || `AmbiVision <${DEFAULT_RECIPIENT}>`);
  const targetRecipient = payload.to || DEFAULT_RECIPIENT;

  try {
    const isGmail = host?.includes('gmail') || user?.endsWith('@gmail.com') || process.env.SMTP_SERVICE === 'gmail';

    const transportOptions = isGmail
      ? {
          service: 'gmail',
          auth: {
            user,
            pass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 8000,
          socketTimeout: 15000,
        }
      : {
          host: host || 'smtp.hostinger.com',
          port,
          secure,
          auth: {
            user,
            pass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 8000,
          socketTimeout: 15000,
        };

    const transporter = nodemailer.createTransport(transportOptions);

    const info = await transporter.sendMail({
      from: fromAddress,
      to: targetRecipient,
      replyTo: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      attachments: payload.attachments?.map((att) => ({
        filename: att.filename,
        content: Buffer.from(att.content, 'base64'),
        contentType: att.contentType,
      })),
    });

    return {
      success: true,
      provider: 'smtp',
      id: info.messageId,
      status: 'accepted',
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      provider: 'smtp',
      status: 'failed',
      error: errMsg,
    };
  }
}

/**
 * Main email dispatcher
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailSendResult> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey && resendApiKey.trim().length > 0) {
    return sendViaResend(resendApiKey.trim(), payload);
  }

  // Fallback: SMTP if configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if ((smtpHost || smtpUser) && smtpPass) {
    return sendViaSmtp(payload);
  }

  // Provider not configured in this environment
  return {
    success: false,
    provider: 'none',
    status: 'unconfigured',
    error: 'Email delivery provider is not configured. Set RESEND_API_KEY or SMTP credentials in .env.local.',
  };
}
