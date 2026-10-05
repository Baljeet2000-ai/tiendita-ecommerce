import './globals.css';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';

export const metadata = {
  title: 'Tiendita',
  description: 'E-commerce con Next.js, Laravel y Stripe',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-zelda-parchment text-zelda-ink min-h-screen">
        <CartProvider>
          <div className="max-w-4xl mx-auto p-6">
            <Header />
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}