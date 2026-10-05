'use client';

import { useCart } from '@/app/context/CartContext';

function formatPrice(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function CartSummary() {
  const { items, total } = useCart();

  if (items.length === 0) {
    return <p className="text-sm text-zelda-ink/70">Tu carrito está vacío.</p>;
  }

  return (
    <div className="mb-6 space-y-2 rounded-lg border border-zelda-ink/15 bg-white/70 p-4">
      {items.map((item) => (
        <div key={item.product.id} className="flex justify-between text-sm text-zelda-ink">
          <span>{item.product.name} x{item.quantity}</span>
          <span>{formatPrice(Number(item.product.price) * item.quantity)}</span>
        </div>
      ))}
      <div className="flex justify-between border-t border-zelda-ink/15 pt-2 font-bold text-zelda-gold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}