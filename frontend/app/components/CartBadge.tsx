'use client';

import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export default function CartBadge() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="relative text-sm text-zelda-ink/80 hover:text-zelda-forest">
      Carrito
      {itemCount > 0 && (
        <span className="ml-1 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-zelda-gold px-1.5 py-0.5 text-xs font-bold text-zelda-ink">
          {itemCount}
        </span>
      )}
    </Link>
  );
}