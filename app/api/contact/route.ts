import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mail";
import {
  buildCmsFormSubmissionData,
  cmsFormApi,
  DEFAULT_CONTACT_FORM_FIELDS,
  extractLegacyContactValues,
  type CmsFormField,
} from "@/lib/cms";

const contactEmailTemplate = ({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Submission</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6d28d9, #0ea5e9);
padding:24px; text-align:center;">
              <h1 style="margin:0; font-size:22px; color:#ffffff;">
                📩 New Contact Form Submission
              </h1>
              <p style="margin:6px 0 0; font-size:14px; color:#e0e7ff;">
                SynapCare Website
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px;">

              <!-- Field -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="font-size:13px; color:#64748b; font-weight:600;">Name</td>
                </tr>
                <tr>
                  <td style="font-size:15px; color:#0f172a; padding-top:4px;">
                    ${name}
                  </td>
                </tr>
              </table>

              <!-- Field -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="font-size:13px; color:#64748b; font-weight:600;">Email</td>
                </tr>
                <tr>
                  <td style="font-size:15px; color:#0f172a; padding-top:4px;">
                    ${email}
                  </td>
                </tr>
              </table>

              <!-- Field -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="font-size:13px; color:#64748b; font-weight:600;">Phone</td>
                </tr>
                <tr>
                  <td style="font-size:15px; color:#0f172a; padding-top:4px;">
                    ${phone}
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:13px; color:#64748b; font-weight:600;">
                    Message
                  </td>
                </tr>
                <tr>
                  <td style="font-size:15px; color:#0f172a; padding-top:8px; background:#f8fafc; border-radius:8px; padding:16px; line-height:1.6;">
                    ${message}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px; background:#f8fafc; text-align:center;">
              <p style="margin:0; font-size:12px; color:#64748b;">
                This message was sent from the SynapCare website contact form.
              </p>
              <p style="margin:6px 0 0; font-size:12px; color:#94a3b8;">
                © SynapCare • All rights reserved
              </p>
            </td>
          </tr>

        </table>
        <!-- End Card -->

      </td>
    </tr>
  </table>

</body>
</html>
`;

function normalizeIncomingData(body: any): Record<string, string> {
  // New CMS-shaped payload: { data: { Name, Email, ... } }
  if (body?.data && typeof body.data === "object" && !Array.isArray(body.data)) {
    const data: Record<string, string> = {};
    for (const [key, value] of Object.entries(body.data)) {
      data[key] = value == null ? "" : String(value);
    }
    return data;
  }

  // Legacy payload: { name, email, phone, message }
  return {
    Name: body?.name == null ? "" : String(body.name),
    Email: body?.email == null ? "" : String(body.email),
    Phone: body?.phone == null ? "" : String(body.phone),
    Message: body?.message == null ? "" : String(body.message),
  };
}

async function resolveFormFields(formId?: string | null): Promise<{
  formId: string | null;
  fields: CmsFormField[];
}> {
  try {
    if (formId) {
      const fields = await cmsFormApi.getFields(formId);
      if (fields.length) return { formId, fields };
    }

    const contactForm = await cmsFormApi.getContactForm();
    return { formId: contactForm.form.id, fields: contactForm.fields };
  } catch (error) {
    console.error("Failed to load CMS contact form fields:", error);
    return { formId: formId || null, fields: DEFAULT_CONTACT_FORM_FIELDS };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const incoming = normalizeIncomingData(body);
    const { formId, fields } = await resolveFormFields(body?.formId);

    const missingRequired = fields.filter((field) => {
      if (!field.required) return false;
      return !(incoming[field.name] || "").trim();
    });

    if (missingRequired.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "All required fields must be filled",
        },
        { status: 400 }
      );
    }

    const legacy = extractLegacyContactValues(incoming);
    const name = legacy.name;
    const email = legacy.email;
    const phone = legacy.phone;
    const message = legacy.message;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Persist submission in CMS when a form is available (does not replace email).
    if (formId) {
      try {
        const cmsData = buildCmsFormSubmissionData(fields, incoming);
        await cmsFormApi.submit(formId, cmsData);
      } catch (cmsError) {
        console.error("CMS form submission failed:", cmsError);
        // Continue — email delivery remains the primary client notification path.
      }
    }

    // Existing email flow — unchanged destination / transporter config.
    await transporter.sendMail({
      from: `"SynapCare Website" <synapcare1510@gmail.com>`,
      to: "synapcare1510@gmail.com",
      replyTo: email,
      subject: "New Contact Form Submission",
      html: contactEmailTemplate({ name, email, phone, message }),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
