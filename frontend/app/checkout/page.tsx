import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/app/lib/auth';
import CartSummary from '@/app/components/CartSummary';
import CheckoutForm from '@/app/components/CheckoutForm';

export default async function CheckoutPage() {
  if (!(await isAuthenticated())) {
    redirect('/login');
  }

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zelda-forest">Pagar pedido</h1>
      <CartSummary />
      <CheckoutForm />
    </main>
  );
}