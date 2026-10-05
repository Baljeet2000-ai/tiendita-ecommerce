import { notFound } from 'next/navigation';
import { ApiError } from '@/app/lib/api';
import { getProduct } from '@/app/lib/products';
import AddToCartButton from '@/app/components/AddToCartButton';

function formatPrice(price: string) {
  return Number(price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    product = await getProduct(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const outOfStock = product.stock <= 0;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-zelda-forest">{product.name}</h1>

      {product.description && (
        <p className="mt-3 text-zelda-ink/80">{product.description}</p>
      )}

      <div className="mt-6 flex items-center justify-between rounded-lg border border-zelda-ink/15 bg-white/70 p-4">
        <span className="text-xl font-bold text-zelda-gold">{formatPrice(product.price)}</span>
        <span className={outOfStock ? 'text-zelda-ember' : 'text-zelda-forest'}>
          {outOfStock ? 'Agotado' : `${product.stock} disponibles`}
        </span>
      </div>

      <div className="mt-6">
        <AddToCartButton product={product} />
      </div>
    </main>
  );
}