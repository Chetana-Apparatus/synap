import nodemailer from "nodemailer";

const EMAIL_USER = "synapcare1510@gmail.com";
const EMAIL_PASS = "kvrb obdr yowi oswu";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS, // MUST be App Password
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Nodemailer Error:", error);
  } else {
    console.log("✅ Nodemailer is ready to send emails");
  }
  console.log("📧 MAIL TRANSPORT CONFIG:", transporter.options);
});

export { transporter };


