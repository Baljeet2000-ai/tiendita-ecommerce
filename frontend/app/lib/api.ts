import 'server-only';
import { cookies } from 'next/headers';
import type { ApiErrorBody } from '@/app/types';

const API_URL = process.env.API_URL || 'http://127.0.0.1:8000/api';
const TOKEN_COOKIE = 'token';

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return 'Ocurrio un error inesperado';
}

interface ApiFetchOptions extends RequestInit {
  /** Si es true, agrega el Bearer token leido de la cookie httpOnly */
  auth?: boolean;
}

export async function apiFetch<T>(endpoint: string, options: ApiFetchOptions = {}): Promise<T> {
  const { auth = false, headers, ...rest } = options;

  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  };

  if (auth) {
    const token = (await cookies()).get(TOKEN_COOKIE)?.value;
    if (token) {
      (requestHeaders as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...rest,
    headers: requestHeaders,
    cache: options.cache ?? 'no-store',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const body = data as ApiErrorBody;
    throw new ApiError(body.message || 'Error en la peticion', response.status, body.errors);
  }

  return data as T;
}