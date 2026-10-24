import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import { persistSubmission, updateSubmissionDelivery } from '@/lib/submission-store';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// Explicit target recipient for all job applications
const TARGET_CAREERS_EMAIL =
  process.env.CAREERS_EMAIL_TO ||
  'prernapawar1618@ambivision.in';

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim();
}

/**
 * Validates PDF magic bytes (must start with %PDF- / 0x25 0x50 0x44 0x46)
 */
function isValidPdfMagicBytes(buffer: Buffer): boolean {
  if (buffer.length < 5) return false;
  return (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46 &&
    buffer[4] === 0x2d
  );
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);

    // 1. Rate Limiting (max 5 applications per 15 minutes per IP)
    const rateLimit = checkRateLimit(ip, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many applications submitted from this network. Please wait ${rateLimit.resetInSeconds} seconds before submitting again.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.resetInSeconds) },
        },
      );
    }

    // 2. Parse Multipart Form Data
    const formData = await request.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json(
        { error: 'Invalid form submission.' },
        { status: 400 },
      );
    }

    // Honeypot check
    const hpField = formData.get('hp_field')?.toString() || '';
    if (hpField) {
      return NextResponse.json(
        { error: 'Automated submission rejected.' },
        { status: 400 },
      );
    }

    // 3. Extract and Validate Text Fields
    const fullName = sanitize(formData.get('fullName')?.toString() || '');
    const email = sanitize(formData.get('email')?.toString() || '');
    const phone = sanitize(formData.get('phone')?.toString() || '');
    const position = sanitize(formData.get('position')?.toString() || '');
    const experience = sanitize(formData.get('experience')?.toString() || '');
    const portfolioUrl = sanitize(formData.get('portfolioUrl')?.toString() || '');
    const resumeUrl = sanitize(formData.get('resumeUrl')?.toString() || '');
    const coverNote = sanitize(formData.get('coverNote')?.toString() || '');

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name.' },
        { status: 422 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 422 },
      );
    }

    if (!position) {
      return NextResponse.json(
        { error: 'Please specify the position you are applying for.' },
        { status: 422 },
      );
    }

    if (!experience || experience.length < 10) {
      return NextResponse.json(
        { error: 'Please provide a summary of your relevant skills and experience (min 10 characters).' },
        { status: 422 },
      );
    }

    // URL validation if portfolio provided
    if (portfolioUrl) {
      try {
        new URL(portfolioUrl);
      } catch {
        return NextResponse.json(
          { error: 'Please enter a valid URL (including https://) for your portfolio or profile.' },
          { status: 422 },
        );
      }
    }

    // URL validation if resume URL provided
    if (resumeUrl) {
      try {
        new URL(resumeUrl);
      } catch {
        return NextResponse.json(
          { error: 'Please enter a valid URL (including https://) for your secure resume link.' },
          { status: 422 },
        );
      }
    }

    // 4. File Handling & Security Validation
    const resumeFile = formData.get('resume') as File | null;
    let resumeAttachment: { filename: string; content: string; contentType?: string } | undefined = undefined;

    if (resumeFile && typeof resumeFile === 'object' && resumeFile.size > 0) {
      if (resumeFile.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: 'Resume file size exceeds the 5 MB limit. Please compress your PDF.' },
          { status: 413 },
        );
      }

      // Check file extension
      const originalName = resumeFile.name || 'resume.pdf';
      if (!originalName.toLowerCase().endsWith('.pdf')) {
        return NextResponse.json(
          { error: 'Only PDF format resumes are accepted (.pdf).' },
          { status: 415 },
        );
      }

      // Inspect binary magic bytes to prevent spoofed MIME or disguised executables
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (!isValidPdfMagicBytes(buffer)) {
        return NextResponse.json(
          { error: 'The uploaded file does not match a valid PDF document structure.' },
          { status: 422 },
        );
      }

      // Safe sanitized filename
      const safeFilename = `${fullName.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;

      resumeAttachment = {
        filename: safeFilename,
        content: buffer.toString('base64'),
        contentType: 'application/pdf',
      };
    }

    // 5. Construct Email
    // Subject line must strictly match specification: "New Job Application — AmbiVision"
    const subject = 'New Job Application — AmbiVision';

    const submittedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const plainText = `
New Job Application — AmbiVision
==============================================
Received: ${submittedAt} (IST)
Target Recipient: ${TARGET_CAREERS_EMAIL}
Applicant Name: ${fullName}
Applicant Email: ${email}
Phone Number: ${phone || 'Not provided'}
Job Title Applied For: ${position}
Portfolio / Links: ${portfolioUrl || 'None provided'}
Secure Private Resume Link: ${resumeUrl || (resumeAttachment ? `[Attached PDF: ${resumeAttachment.filename}]` : 'None provided')}

Relevant Skills and Experience:
----------------------------------------------
${experience}

Application Message / Cover Note:
----------------------------------------------
${coverNote || 'No additional message provided.'}

Resume Attachment: ${resumeAttachment ? resumeAttachment.filename : 'No file attached'}
Client IP: ${ip}
==============================================
Hit 'Reply' directly to respond to ${fullName} (${email}).
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0b0e; color: #e5e5e7; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #141418; border: 1px solid #27272e; border-radius: 16px; overflow: hidden; }
    .header { background: #1c1c22; padding: 24px 32px; border-bottom: 1px solid #27272e; }
    .header h1 { margin: 0; font-size: 20px; color: #ffffff; font-weight: 700; }
    .header p { margin: 6px 0 0; color: #94949e; font-size: 13px; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #8e8e98; margin-bottom: 4px; font-weight: 600; }
    .value { font-size: 15px; color: #ffffff; font-weight: 500; }
    .box { background: #0c0c0e; border: 1px solid #222228; border-radius: 10px; padding: 16px; margin-top: 6px; font-size: 14px; line-height: 1.7; color: #d0d0d8; white-space: pre-wrap; }
    .badge { display: inline-block; background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 600; }
    .footer { padding: 20px 32px; background: #111115; border-top: 1px solid #222228; font-size: 12px; color: #767682; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Job Application — AmbiVision</h1>
      <p>Candidate applied on ${submittedAt} IST</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Job Title Applied For</div>
        <div class="value"><span class="badge">${position}</span></div>
      </div>
      <div class="field">
        <div class="label">Applicant Name</div>
        <div class="value">${fullName}</div>
      </div>
      <div class="field">
        <div class="label">Applicant Email Address</div>
        <div class="value"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></div>
      </div>
      ${phone ? `
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value">${phone}</div>
      </div>` : ''}
      ${portfolioUrl ? `
      <div class="field">
        <div class="label">Portfolio / GitHub / LinkedIn Links</div>
        <div class="value"><a href="${portfolioUrl}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8;">${portfolioUrl}</a></div>
      </div>` : ''}
      ${resumeUrl ? `
      <div class="field">
        <div class="label">Secure Private Resume Link</div>
        <div class="value"><a href="${resumeUrl}" target="_blank" rel="noopener noreferrer" style="color: #c084fc; font-weight: 600;">🔗 ${resumeUrl}</a></div>
      </div>` : ''}
      <div class="field">
        <div class="label">Relevant Skills &amp; Experience</div>
        <div class="box">${experience}</div>
      </div>
      ${coverNote ? `
      <div class="field">
        <div class="label">Application Message / Cover Note</div>
        <div class="box">${coverNote}</div>
      </div>` : ''}
      <div class="field">
        <div class="label">Resume Attachment</div>
        <div class="value">${resumeAttachment ? `📎 Attached securely (${resumeAttachment.filename})` : (resumeUrl ? 'Provided as secure link above' : 'No file attached')}</div>
      </div>
    </div>
    <div class="footer">
      Recipient: <strong>${TARGET_CAREERS_EMAIL}</strong> · Candidate Confidentiality: Reply directly to contact <strong>${fullName}</strong> at <strong>${email}</strong>.
    </div>
  </div>
</body>
</html>
`.trim();

    // 6. Pre-persist application data so candidate information is NEVER lost
    const submissionId = `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    await persistSubmission({
      id: submissionId,
      type: 'careers',
      timestamp: new Date().toISOString(),
      applicantEmail: email,
      targetRecipient: TARGET_CAREERS_EMAIL,
      subject,
      data: {
        fullName,
        email,
        phone,
        position,
        experience,
        portfolioUrl,
        resumeUrl,
        coverNote,
        hasAttachment: !!resumeAttachment,
        attachmentName: resumeAttachment?.filename,
        clientIp: ip,
      },
      emailDelivery: {
        status: 'pending',
      },
    });

    // 7. Deliver Notification explicitly addressed to TARGET_CAREERS_EMAIL
    const emailResult = await sendEmail({
      to: TARGET_CAREERS_EMAIL,
      replyTo: email,
      subject,
      text: plainText,
      html: htmlContent,
      attachments: resumeAttachment ? [resumeAttachment] : undefined,
    });

    // Update stored application with provider delivery outcome
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
          applicationId: submissionId,
          error:
            `Email service is not configured. Your application was safely retained on the server (ID: ${submissionId}). Please configure RESEND_API_KEY or SMTP credentials in your server environment to deliver directly to ${TARGET_CAREERS_EMAIL}.`,
        },
        { status: 503 },
      );
    }

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          status: 'failed',
          applicationId: submissionId,
          error: `Application notification could not be accepted by the email provider: ${emailResult.error || 'Provider rejected message.'}. Application data was retained on the server (ID: ${submissionId}).`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      status: 'accepted',
      applicationId: emailResult.id || submissionId,
      message: `Your application has been successfully submitted and delivered to ${TARGET_CAREERS_EMAIL}.`,
    });
  } catch (error) {
    console.error('[Careers API Error]:', error);
    return NextResponse.json(
      {
        error: `An internal error occurred while processing your application. Please email ${TARGET_CAREERS_EMAIL} directly.`,
      },
      { status: 500 },
    );
  }
}
