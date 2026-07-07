import nodemailer from 'nodemailer';
import { env } from '../env';
import { logger } from './logger';

export const sendPasswordResetEmail = async (to: string, token: string) => {
  let transporter;
  
  if (env.SMTP_HOST && env.SMTP_USER) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  } else {
    // Generate a test Ethereal account if no SMTP provided
    logger.warn('No SMTP config provided. Generating test Ethereal email account...');
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const resetUrl = `http://localhost:5173/giftadmin/reset-password?token=${token}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #1a3c5e;">Password Reset Request</h2>
      <p>Hello,</p>
      <p>We received a request to reset the password for your admin account: <strong>${to}</strong></p>
      <p>Click the button below to set a new password. This link is valid for 1 hour.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #1a3c5e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
      </div>
      <p style="color: #64748b; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"GIFT Moral Nexus Admin" <noreply@gift.edu.pk>',
      to,
      subject: 'Password Reset - GIFT Moral Nexus',
      html: htmlContent,
    });
    
    logger.info(`Password reset email sent to ${to}. Message ID: ${info.messageId}`);
    
    // Log the Ethereal URL if using the fallback (so we can test without real SMTP)
    if (!env.SMTP_HOST) {
        logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (error) {
    logger.error(`Failed to send password reset email to ${to}`, error);
    throw new Error('Email service configuration error. Please contact support.');
  }
};
