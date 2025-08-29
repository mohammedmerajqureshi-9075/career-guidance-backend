import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const sendMail = async (options) => {
  try {
    console.log("📧 Using email:", process.env.EMAIL);

    // transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    // mail options
    let mailOptions = {
      from: `"Career Guidance" <${process.env.EMAIL}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    // send
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

export default sendMail;
