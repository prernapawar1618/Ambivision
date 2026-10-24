import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { persistSubmission, updateSubmissionDelivery } from '@/lib/submission-store';

// Explicit target recipient for all project inquiries
const TARGET_CONTACT_EMAIL =
  process.env.CONTACT_EMAIL_TO || 'prernapawar1618@ambivision.in';

// Simple recent submission hash store to prevent double-click / duplicate spam
const recentSubmissions = new Map<string, number>();

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim();
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);

    // 1. Rate limiting (max 5 inquiries per 10 minutes per IP)
    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many submissions. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.resetInSeconds) },
        },
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 },
      );
    }

    // 2. Honeypot check for bots
    if (body.hp_check || body.website_url) {
      return NextResponse.json(
        { error: 'Automated submission rejected.' },
        { status: 400 },
      );
    }

    // 3. Validation
    const name = sanitize(body.name || '');
    const email = sanitize(body.email || '');
    const company = sanitize(body.company || '');
    const service = sanitize(body.service || '');
    const budget = sanitize(body.budget || '');
    const timeline = sanitize(body.timeline || '');
    const description = sanitize(body.description || '');

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name (at least 2 characters).' },
        { status: 422 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: 'Please enter a valid work email address.' },
        { status: 422 },
      );
    }

    if (!service) {
      return NextResponse.json(
        { error: 'Please select a core service discipline.' },
        { status: 422 },
      );
    }

    if (!description || description.length < 10) {
      return NextResponse.json(
        { error: 'Please provide a project description (at least 10 characters).' },
        { status: 422 },
      );
    }

    // 4. Duplicate prevention
    const submissionHash = `${email}:${service}:${description.substring(0, 50)}`;
    const now = Date.now();
    const lastSubmitted = recentSubmissions.get(submissionHash);
    if (lastSubmitted && now - lastSubmitted < 60 * 1000) {
      return NextResponse.json(
        { error: 'You have just submitted this inquiry. Please allow a moment before resubmitting.' },
        { status: 429 },
      );
    }
    recentSubmissions.set(submissionHash, now);

    // 5. Construct email content
    // Subject line must strictly match specification: "New Project Inquiry — AmbiVision"
    const subject = 'New Project Inquiry — AmbiVision';

    const serviceLabels: Record<string, string> = {
      web: 'Web Design & Development',
      ai: 'AI Solutions & Intelligent Agents',
      mobile: 'Mobile App Development',
      uiux: 'UI/UX & Product Design',
      ecommerce: 'E-commerce Stores',
      seo: 'Technical SEO & AI Search (GEO / AEO)',
      custom: 'Custom Software Architecture',
      saas: 'SaaS Product Engineering & Multi-Tenant Architecture',
    };
    const readableService = serviceLabels[service] || service;

    const submittedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const plainText = `
New Project Inquiry — AmbiVision
==============================================
Received: ${submittedAt} (IST)
Target Recipient: ${TARGET_CONTACT_EMAIL}
Customer Name: ${name}
Customer Email: ${email}
Company: ${company || 'Not provided'}
Selected Service: ${readableService}
Estimated Budget: ${budget || 'Not specified'}
Expected Timeline: ${timeline || 'Not specified'}

Full Inquiry Message:
----------------------------------------------
${description}

Client IP: ${ip}
==============================================
Hit 'Reply' directly to respond to ${name} (${email}).
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b0e; color: #e5e5e7; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #141418; border: 1px solid #27272e; border-radius: 16px; overflow: hidden; }
    .header { background: #1c1c22; padding: 24px 32px; border-bottom: 1px solid #27272e; }
    .header h1 { margin: 0; font-size: 20px; color: #ffffff; font-weight: 700; letter-spacing: -0.01em; }
    .header p { margin: 6px 0 0; color: #94949e; font-size: 13px; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #8e8e98; margin-bottom: 4px; font-weight: 600; }
    .value { font-size: 15px; color: #ffffff; font-weight: 500; }
    .desc-box { background: #0c0c0e; border: 1px solid #222228; border-radius: 10px; padding: 18px; margin-top: 8px; font-size: 14px; line-height: 1.7; color: #d0d0d8; white-space: pre-wrap; }
    .badge { display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
    .footer { padding: 20px 32px; background: #111115; border-top: 1px solid #222228; font-size: 12px; color: #767682; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Project Inquiry — AmbiVision</h1>
      <p>Submitted via AmbiVision website on ${submittedAt} IST</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Customer Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Customer Email Address</div>
        <div class="value"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></div>
      </div>
      ${company ? `
      <div class="field">
        <div class="label">Company / Organization</div>
        <div class="value">${company}</div>
      </div>` : ''}
      <div class="field">
        <div class="label">Selected Service</div>
        <div class="value"><span class="badge">${readableService}</span></div>
      </div>
      ${budget ? `
      <div class="field">
        <div class="label">Estimated Budget</div>
        <div class="value">${budget}</div>
      </div>` : ''}
      ${timeline ? `
      <div class="field">
        <div class="label">Target Timeline</div>
        <div class="value">${timeline}</div>
      </div>` : ''}
      <div class="field">
        <div class="label">Full Inquiry Message / Project Details</div>
        <div class="desc-box">${description}</div>
      </div>
    </div>
    <div class="footer">
      Recipient: <strong>${TARGET_CONTACT_EMAIL}</strong> · Reply directly to this notification to contact <strong>${name}</strong> (${email}).
    </div>
  </div>
</body>
</html>
`.trim();

    // 6. Pre-persist inquiry data so it is NEVER lost even if provider fails
    const submissionId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    await persistSubmission({
      id: submissionId,
      type: 'contact',
      timestamp: new Date().toISOString(),
      applicantEmail: email,
      targetRecipient: TARGET_CONTACT_EMAIL,
      subject,
      data: {
        name,
        email,
        company,
        service: readableService,
        budget,
        timeline,
        description,
        clientIp: ip,
      },
      emailDelivery: {
        status: 'pending',
      },
    });

    // 7. Deliver email explicitly addressed to TARGET_CONTACT_EMAIL
    const emailResult = await sendEmail({
      to: TARGET_CONTACT_EMAIL,
      replyTo: email,
      subject,
      text: plainText,
      html: htmlContent,
    });

    // Update stored submission with provider result
    await updateSubmissionDelivery(submissionId, {
      status: emailResult.status,
      provider: emailResult.provider,
      messageId: emailResult.id,
      error: emailResult.error,
    });

    if (emailResult.status === 'unconfigured') {
      return NextResponse.json(
        {
          success: false,
          status: 'unconfigured',
          submissionId,
          error:
            `Email delivery provider is not configured. Your inquiry was securely recorded on the server (ID: ${submissionId}). Please configure RESEND_API_KEY or SMTP credentials in your server environment to deliver directly to ${TARGET_CONTACT_EMAIL}.`,
        },
        { status: 503 },
      );
    }

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          status: 'failed',
          submissionId,
          error: `Email delivery was not accepted by the provider: ${emailResult.error || 'Provider rejected message.'}. Inquiry data was retained on the server (ID: ${submissionId}).`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      status: 'accepted',
      inquiryId: emailResult.id || submissionId,
      message: `Your inquiry has been received and routed to ${TARGET_CONTACT_EMAIL}. Our team will review and reply within one business day.`,
    });
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json(
      {
        error: `An unexpected internal error occurred while processing your request. Please email ${TARGET_CONTACT_EMAIL} directly.`,
      },
      { status: 500 },
    );
  }
}
