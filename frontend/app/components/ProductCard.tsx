import Link from 'next/link';
import type { Product } from '@/app/types';

function formatPrice(price: string) {
  return Number(price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock <= 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className="block rounded-lg border border-zelda-ink/15 bg-white/70 p-4 transition hover:border-zelda-gold hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-zelda-forest">{product.name}</h3>
      {product.description && (
        <p className="mt-1 line-clamp-2 text-sm text-zelda-ink/70">{product.description}</p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-bold text-zelda-gold">{formatPrice(product.price)}</span>
        <span className={`text-xs ${outOfStock ? 'text-zelda-ember' : 'text-zelda-forest'}`}>
          {outOfStock ? 'Agotado' : `${product.stock} disponibles`}
        </span>
      </div>
    </Link>
  );
}