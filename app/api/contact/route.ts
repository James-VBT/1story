import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function buildEmailHtml(
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
) {
  const row = (label: string, value: string, isLink = false) => `
    <tr>
      <td style="padding:12px 16px;background:#f8f9fa;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;width:100px;vertical-align:top">${label}</td>
      <td style="padding:12px 16px;font-size:14px;color:#0d1b2a;vertical-align:top">${isLink ? `<a href="mailto:${value}" style="color:#2a9d8f;text-decoration:none">${value}</a>` : value}</td>
    </tr>
  `;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 20px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

          <!-- Header -->
          <tr>
            <td style="background:#0d1b2a;padding:32px 40px;border-radius:8px 8px 0 0">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#2a9d8f">New Message</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff">Contact Form Submission</h1>
            </td>
          </tr>

          <!-- Details table -->
          <tr>
            <td style="background:#ffffff;padding:0">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                ${row("Name", name)}
                <tr><td colspan="2" style="height:1px;background:#f0f4f8;padding:0"></td></tr>
                ${row("Email", email, true)}
                ${phone ? `<tr><td colspan="2" style="height:1px;background:#f0f4f8;padding:0"></td></tr>${row("Phone", phone)}` : ""}
                ${subject ? `<tr><td colspan="2" style="height:1px;background:#f0f4f8;padding:0"></td></tr>${row("Subject", subject)}` : ""}
              </table>
            </td>
          </tr>

          <!-- Message body -->
          <tr>
            <td style="background:#ffffff;padding:0 40px 8px">
              <hr style="border:none;border-top:2px solid #f0f4f8;margin:0"/>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;padding:8px 40px 32px">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280">Message</p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#374151;white-space:pre-wrap">${message}</p>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="background:#f8f9fa;padding:20px 40px;border-top:1px solid #e5e7eb">
              <a href="mailto:${email}?subject=Re: ${subject || `Your enquiry`}"
                 style="display:inline-block;background:#2a9d8f;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:12px 24px;border-radius:4px">
                Reply to ${name}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f9fa;padding:16px 40px 32px;border-radius:0 0 8px 8px;border-top:1px solid #e5e7eb">
              <p style="margin:0;font-size:11px;color:#9ca3af">
                This email was sent via the contact form on your website.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  const { name, email, phone, subject, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 },
    );
  }

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: process.env.RESEND_TO!,
    replyTo: email,
    subject: subject ? `${subject} — from ${name}` : `New enquiry from ${name}`,
    html: buildEmailHtml(name, email, phone ?? "", subject ?? "", message),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
