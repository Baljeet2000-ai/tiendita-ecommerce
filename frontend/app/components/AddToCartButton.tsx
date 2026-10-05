'use client';

import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import type { Product } from '@/app/types';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock <= 0;

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (outOfStock) {
    return (
      <button disabled className="w-full rounded-md bg-zelda-ink/10 px-4 py-2 text-sm font-medium text-zelda-ink/50">
        Agotado
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        min={1}
        max={product.stock}
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
        className="w-16 rounded border border-zelda-ink/20 px-2 py-2 text-sm text-zelda-ink"
      />
      <button
        onClick={handleAdd}
        className="flex-1 rounded-md bg-zelda-forest px-4 py-2 text-sm font-medium text-white hover:bg-zelda-forest-dark"
      >
        {added ? 'Agregado ✓' : 'Agregar al carrito'}
      </button>
    </div>
  );
}