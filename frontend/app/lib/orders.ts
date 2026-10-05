import { apiFetch } from './api';
import type { ApiItemResponse, ApiListResponse, Order } from '@/app/types';

export async function getOrders(): Promise<Order[]> {
  const { data } = await apiFetch<ApiListResponse<Order>>('/orders', { auth: true });
  return data;
}

export async function getOrder(id: number | string): Promise<Order> {
  const { data } = await apiFetch<ApiItemResponse<Order>>(`/orders/${id}`, { auth: true });
  return data;
}