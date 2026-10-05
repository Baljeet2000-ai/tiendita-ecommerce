'use server';

import { redirect } from 'next/navigation';
import { apiFetch, ApiError } from '@/app/lib/api';
import { isAuthenticated } from '@/app/lib/auth';
import type { ApiItemResponse, Order } from '@/app/types';

export interface CreateOrderInput {
  items: { product_id: number; quantity: number }[];
  payment_method: string;
}

export interface CreateOrderResult {
  success: boolean;
  order?: Order;
  error?: string;
}

export async function createOrderAction(input: CreateOrderInput): Promise<CreateOrderResult> {
  if (!(await isAuthenticated())) {
    redirect('/login');
  }

  try {
    const res = await apiFetch<ApiItemResponse<Order>>('/orders', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(input),
    });

    return { success: true, order: res.data };
  } catch (error) {
    // 402 = pago rechazado por Stripe, 422 = stock insuficiente/validacion
    if (error instanceof ApiError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'No se pudo procesar la orden' };
  }
}