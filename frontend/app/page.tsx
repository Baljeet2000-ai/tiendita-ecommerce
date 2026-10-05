import ProductCard from '@/app/components/ProductCard';
import { getProducts } from '@/app/lib/products';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zelda-forest">Catálogo</h1>

      {products.length === 0 ? (
        <p className="text-zelda-ink/70">No hay productos disponibles por el momento.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}