import nodemailer from "nodemailer";
import { SendEmailOptions } from "../types";

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? "587", 10),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

export const sendEmail = async ({ to, subject, html, text }: SendEmailOptions): Promise<void> => {
  if (!process.env.SMTP_USER) {
    console.log(`[Email skipped] To: ${to} | Subject: ${subject}`);
    return;
  }
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"${process.env.FROM_NAME ?? "Mayray AI"}" <${process.env.FROM_EMAIL ?? process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text,
  });
};
