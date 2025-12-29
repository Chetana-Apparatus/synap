require("dotenv").config();
console.log("ENV CHECK:", {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS ? "SET" : "MISSING",
});

const express = require("express")
const cors = require("cors")
const { transporter } = require ("./config/mail.js"); 

const app = express()


/* ---------- MIDDLEWARES ---------- */

// Allow frontend requests
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://192.168.1.192:3000"], // Next.js frontend
  methods: ["GET", "POST"],
}))

// Parse JSON body
app.use(express.json())

// Parse form data
app.use(express.urlencoded({ extended: true }))

/* ---------- ROUTES ---------- */

app.get("/", (req, res) => {
  res.send("✅ SynapCare Backend Running")
})


app.post("/contact", async (req, res) => {
  try {

    const contactEmailTemplate = ({ name, email, phone, message }) => `
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
`
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // Send email to website owner
    await transporter.sendMail({
      from: `"SynapCare Website" <${process.env.EMAIL_USER}>`,
      to: process.env.WEB_OWNER, // you receive it
      replyTo: email, // reply goes to user
      subject: "New Contact Form Submission",
      html: contactEmailTemplate({ name, email, phone, message }),
    });
   

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


/* ---------- SERVER ---------- */

const PORT = 5000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`🚀 Also accessible at http://192.168.1.192:${PORT}`)
})
