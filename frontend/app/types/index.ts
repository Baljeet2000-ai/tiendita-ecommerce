// Tipos que reflejan las respuestas de la API Laravel (final-api)

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string; // Laravel devuelve los decimales como string
  stock: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  product?: Product;
}

export interface Payment {
  id: number;
  order_id: number;
  stripe_payment_intent_id: string | null;
  amount: string;
  currency: string;
  status: string;
  payment_method: string | null;
}

export interface Order {
  id: number;
  user_id: number;
  total: string;
  status: 'pending' | 'paid' | 'failed';
  items: OrderItem[];
  payment?: Payment | null;
  created_at?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
  type_token: string;
}

export interface ApiListResponse<T> {
  data: T[];
}

export interface ApiItemResponse<T> {
  data: T;
  message?: string;
}

// Forma del error que devuelve Laravel (validacion 422 o mensaje simple)
export interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}