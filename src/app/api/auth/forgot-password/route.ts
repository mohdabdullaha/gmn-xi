import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/auth.service';
import { sendPasswordResetEmail } from '@/lib/utils/mailer';
import { forgotPasswordSchema } from '@/lib/schemas';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = forgotPasswordSchema.parse({ body });
    const { email } = parsed.body;

    const user = await authService.findAdminByEmail(email);

    if (user) {
      const resetToken = await authService.createPasswordResetToken(email);
      await sendPasswordResetEmail(email, resetToken);
    }

    return NextResponse.json({ status: 'success', message: 'If the email exists, a reset link was sent.' });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ message: 'Validation Error', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
