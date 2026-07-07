import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/auth.service';
import { loginSchema } from '@/lib/schemas';
import jwt from 'jsonwebtoken';
import { env } from '@/lib/env';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate
    const parsed = loginSchema.parse({ body });
    const { email, password } = parsed.body;

    // Authenticate
    const user = await authService.validateAdmin(email, password);
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { email: user.email, role: 'admin' },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );

    // Create Response
    const response = NextResponse.json({ status: 'success', email: user.email });
    
    // Set Cookie
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7200, // 2 hours in seconds
    });

    return response;
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ message: 'Validation Error', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
