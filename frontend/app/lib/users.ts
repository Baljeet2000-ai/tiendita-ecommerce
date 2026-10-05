import { apiFetch, ApiError } from './api';
import { isAuthenticated } from './auth';
import type { User } from '@/app/types';

export async function getCurrentUser(): Promise<User | null> {
  if (!(await isAuthenticated())) return null;

  try {
    return await apiFetch<User>('/user', { auth: true });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
}