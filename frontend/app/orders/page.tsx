import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/app/lib/auth';
import { getOrders } from '@/app/lib/orders';

function formatPrice(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function formatDate(value?: string) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('es-SV', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const statusLabels: Record<string, { text: string; className: string }> = {
  paid: { text: 'Pagada', className: 'bg-zelda-forest/15 text-zelda-forest' },
  pending: { text: 'Pendiente', className: 'bg-zelda-gold/20 text-zelda-gold' },
  failed: { text: 'Fallida', className: 'bg-zelda-ember/15 text-zelda-ember' },
};

export default async function OrdersPage() {
  if (!(await isAuthenticated())) {
    redirect('/login');
  }

  const orders = await getOrders();

  if (orders.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold text-zelda-forest">Historial de compras</h1>
        <p className="mb-4 text-zelda-ink/70">Todavía no tienes compras registradas.</p>
        <Link href="/" className="text-zelda-sky hover:underline">
          Ver catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zelda-forest">Historial de compras</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const status = statusLabels[order.status] ?? {
            text: order.status,
            className: 'bg-zelda-ink/10 text-zelda-ink/70',
          };

          return (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block rounded-lg border border-zelda-ink/15 bg-white/70 p-4 hover:border-zelda-gold hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zelda-ink">Orden #{order.id}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}>
                  {status.text}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm text-zelda-ink/70">
                <span>{formatDate(order.created_at)}</span>
                <span className="font-medium text-zelda-gold">{formatPrice(Number(order.total))}</span>
              </div>
              <p className="mt-1 text-xs text-zelda-ink/50">
                {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}