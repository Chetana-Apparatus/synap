const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const { EMAIL_USER, EMAIL_PASS } = process.env;
if (!EMAIL_USER || !EMAIL_PASS) {

  console.error(" EMAIL ENV VARIABLES NOT SET");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS, // MUST be App Password
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error(" Nodemailer Error:", error);
  } else {
    console.log(" Nodemailer is ready to send emails");
  }
  console.log("📧 MAIL TRANSPORT CONFIG:", transporter.options);

});

module.exports = { transporter };
