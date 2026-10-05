'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { apiFetch, ApiError } from '@/app/lib/api';
import { setAuthCookie, clearAuthCookie } from '@/app/lib/auth';
import type { AuthResponse } from '@/app/types';

export interface AuthFormState {
  error: string | null;
  fieldErrors?: Record<string, string[]>;
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  try {
    const res = await apiFetch<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    await setAuthCookie(res.token);
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message, fieldErrors: error.errors };
    }
    return { error: 'No se pudo iniciar sesion' };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const name = String(formData.get('name') ?? '');
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  try {
    await apiFetch('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message, fieldErrors: error.errors };
    }
    return { error: 'No se pudo completar el registro' };
  }

  redirect('/login?registered=1');
}

export async function logoutAction(): Promise<void> {
  await clearAuthCookie();
  revalidatePath('/', 'layout');
  redirect('/');
}