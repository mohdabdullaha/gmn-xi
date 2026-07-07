import { z } from 'zod';

// ── Auth Schemas ────────────────────────────────────────────

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Valid email is required').trim(),
    password: z.string().min(1, 'Password is required'),
  }),
});

// ── Password Complexity Schema ──────────────────────────────
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[\W_]/, 'Password must contain at least one special character');

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Valid email is required').trim(),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token is required'),
    password: passwordSchema,
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: passwordSchema,
  }),
});

// ── Video Schemas ───────────────────────────────────────────

export const videoSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(100).trim(),
    youtubeUrl: z.string().url('Invalid YouTube URL').trim(),
    order: z.number().int().min(0).optional(),
  }),
});

// ── PDF Schemas ─────────────────────────────────────────────

export const pdfSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(150).trim(),
    desc: z.string().max(500).optional().default(''),
    fileUrl: z.string().min(1, 'File URL is required').trim(),
    order: z.number().int().min(0).optional(),
  }),
});

// ── Contact / Inquiry Schema ────────────────────────────────

const ALLOWED_EMAIL_DOMAINS = ['gmail.com', 'gift.edu.pk'];

export const inquirySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100).trim(),
    email: z.string().email('Valid email is required').trim()
      .refine(
        (email) => {
          const domain = email.split('@')[1]?.toLowerCase();
          return ALLOWED_EMAIL_DOMAINS.includes(domain);
        },
        { message: 'Only @gmail.com and @gift.edu.pk email addresses are accepted' }
      ),
    message: z.string().min(1, 'Message is required').max(2000).trim(),
  }),
});

// ── ID Param Schema ─────────────────────────────────────────

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
});

// ── Type Exports ────────────────────────────────────────────

export type LoginInput = z.infer<typeof loginSchema>['body'];
export type VideoInput = z.infer<typeof videoSchema>['body'];
export type PdfInput = z.infer<typeof pdfSchema>['body'];
export type InquiryInput = z.infer<typeof inquirySchema>['body'];
