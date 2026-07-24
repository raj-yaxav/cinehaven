import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_EXPIRES_IN = '7d';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is required');
  }
  return secret;
}

export function generateToken(payload: { adminId: string; email: string; role: string }) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, getJwtSecret()) as { adminId: string; email: string; role: string };
  } catch {
    return null;
  }
}

export function getAdminFromToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function setAdminCookie(token: string) {
  cookies().set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

export function removeAdminCookie() {
  cookies().delete('admin_token');
}
