import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { isAuthenticated } from '@/app/lib/auth';
import { getOrder } from '@/app/lib/orders';
import { ApiError } from '@/app/lib/api';

function formatPrice(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAuthenticated())) {
    redirect('/login');
  }

  const { id } = await params;

  let order;
  try {
    order = await getOrder(id);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 403)) {
      notFound();
    }
    throw error;
  }

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <Link href="/orders" className="mb-4 inline-block text-sm text-zelda-sky hover:underline">
        ← Volver al historial
      </Link>

      <h1 className="mb-1 text-2xl font-bold text-zelda-forest">Orden #{order.id}</h1>
      <p className="mb-6 text-sm text-zelda-ink/70">Estado: {order.status}</p>

      <div className="mb-6 rounded-lg border border-zelda-ink/15 bg-white/70 p-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between py-1 text-sm text-zelda-ink">
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

      {order.payment && (
        <div className="rounded-lg border border-zelda-ink/15 bg-white/70 p-4 text-sm text-zelda-ink/70">
          <p>Metodo de pago: {order.payment.payment_method ?? '—'}</p>
          <p>Estado del pago: {order.payment.status}</p>
        </div>
      )}
    </main>
  );
}