import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { isAuthenticated } from '@/app/lib/auth';
import { getOrder } from '@/app/lib/orders';
import { ApiError } from '@/app/lib/api';

function formatPrice(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  if (!(await isAuthenticated())) {
    redirect('/login');
  }

  const { order: orderId } = await searchParams;
  if (!orderId) notFound();

  let order;
  try {
    order = await getOrder(orderId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12 text-center">
      <h1 className="mb-2 text-2xl font-bold text-zelda-forest">¡Compra exitosa!</h1>
      <p className="mb-6 text-zelda-ink/70">Tu orden #{order.id} fue procesada correctamente.</p>

      <div className="mb-6 rounded-lg border border-zelda-ink/15 bg-white/70 p-4 text-left">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm text-zelda-ink">
            <span>
              {item.product?.name ?? `Producto #${item.product_id}`} x{item.quantity}
            </span>
            <span>{formatPrice(Number(item.price) * item.quantity)}</span>
          </div>
        ))}
        <div className="mt-2 flex justify-between border-t border-zelda-ink/15 pt-2 font-bold text-zelda-gold">
          <span>Total</span>
          <span>{formatPrice(Number(order.total))}</span>
        </div>
      </div>

      <Link href="/" className="text-zelda-sky hover:underline">
        Volver al catálogo
      </Link>
    </main>
  );
}