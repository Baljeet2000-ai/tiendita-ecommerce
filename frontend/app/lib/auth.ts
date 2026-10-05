import 'server-only';
import { cookies } from 'next/headers';

const TOKEN_COOKIE = 'token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

export async function setAuthCookie(token: string) {
  (await cookies()).set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearAuthCookie() {
  (await cookies()).delete(TOKEN_COOKIE);
}

export async function getAuthToken(): Promise<string | undefined> {
  return (await cookies()).get(TOKEN_COOKIE)?.value;
}

export async function isAuthenticated(): Promise<boolean> {
  return !!(await getAuthToken());
}