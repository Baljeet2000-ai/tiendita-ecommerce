'use client';

import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

function formatPrice(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold text-zelda-forest">Tu carrito está vacío</h1>
        <Link href="/" className="text-zelda-sky hover:underline">
          Ver catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zelda-forest">Tu carrito</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between rounded-lg border border-zelda-ink/15 bg-white/70 p-4">
            <div>
              <p className="font-semibold text-zelda-ink">{item.product.name}</p>
              <p className="text-sm text-zelda-ink/70">{formatPrice(Number(item.product.price))} c/u</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={item.product.stock}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                className="w-16 rounded border border-zelda-ink/20 px-2 py-1 text-sm text-zelda-ink"
              />
              <span className="w-20 text-right font-medium text-zelda-gold">
                {formatPrice(Number(item.product.price) * item.quantity)}
              </span>
              <button onClick={() => removeItem(item.product.id)} className="text-sm text-zelda-ember hover:underline">
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zelda-ink/15 pt-4">
        <button onClick={clearCart} className="text-sm text-zelda-ink/60 hover:underline">
          Vaciar carrito
        </button>
        <span className="text-xl font-bold text-zelda-gold">Total: {formatPrice(total)}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block w-full rounded-md bg-zelda-forest px-4 py-3 text-center font-medium text-white hover:bg-zelda-forest-dark"
      >
        Proceder al pago
      </Link>
    </main>
  );
}