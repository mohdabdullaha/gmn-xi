import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/auth.service';
import { resetPasswordSchema } from '@/lib/schemas';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = resetPasswordSchema.parse({ body });
    const { token, password } = parsed.body;

    const user = await authService.verifyPasswordResetToken(token);
    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired reset token' }, { status: 400 });
    }

    await authService.updatePassword(user.email, password);
    await authService.clearPasswordResetToken(user.email);

    return NextResponse.json({ status: 'success', message: 'Password has been successfully reset' });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ message: 'Validation Error', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
