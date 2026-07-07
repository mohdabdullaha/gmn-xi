import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { env } from './env';

export interface AuthUser {
  email: string;
  role: string;
}

export function getAuthUser(req: NextRequest): AuthUser | null {
  const token = req.cookies.get('auth_token')?.value;
  
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function requireAdmin(req: NextRequest): AuthUser | null {
  const user = getAuthUser(req);
  if (!user || user.role !== 'admin') {
    return null;
  }
  return user;
}
