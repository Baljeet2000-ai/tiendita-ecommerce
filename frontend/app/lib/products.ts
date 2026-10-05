import { apiFetch } from './api';
import type { ApiItemResponse, ApiListResponse, Product } from '@/app/types';

export async function getProducts(): Promise<Product[]> {
  const { data } = await apiFetch<ApiListResponse<Product>>('/products');
  return data;
}

export async function getProduct(id: number | string): Promise<Product> {
  const { data } = await apiFetch<ApiItemResponse<Product>>(`/products/${id}`);
  return data;
}