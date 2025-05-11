import nodemailer from "nodemailer";
// Create a SMTP transporter object

export const emailTransporter = () => {
  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    // service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
};
