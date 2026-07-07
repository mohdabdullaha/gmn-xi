import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/auth.service';
import { changePasswordSchema } from '@/lib/schemas';
import { requireAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = requireAdmin(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = changePasswordSchema.parse({ body });
    const { oldPassword, newPassword } = parsed.body;

    const dbUser = await authService.validateAdmin(user.email, oldPassword);
    if (!dbUser) {
      return NextResponse.json({ message: 'Incorrect old password' }, { status: 401 });
    }

    await authService.updatePassword(user.email, newPassword);

    return NextResponse.json({ status: 'success', message: 'Password changed successfully' });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ message: 'Validation Error', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
