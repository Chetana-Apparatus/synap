import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mail";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Send email to website owner
    await transporter.sendMail({
      from: `"SynapCare Website" <synapcare1510@gmail.com>`,
      to: "synapcare1510@gmail.com", // you receive it
      replyTo: email, // reply goes to user
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


