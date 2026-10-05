import Link from 'next/link';
import { getCurrentUser } from '@/app/lib/users';
import { logoutAction } from '@/app/actions/auth';
import CartBadge from './CartBadge';

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="mb-6 flex items-center justify-between border-b border-zelda-ink/15 pb-4">
      <Link href="/" className="text-lg font-bold text-zelda-forest">
        Tiendita
      </Link>

      <div className="flex items-center gap-4">
        <CartBadge />

        {user ? (
          <div className="flex items-center gap-3">
            <Link href="/orders" className="text-sm text-zelda-sky hover:underline">
              Mis compras
            </Link>
            <span className="text-sm text-zelda-ink/70">{user.name}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="bg-zelda-gold/30 hover:bg-zelda-gold/50 text-zelda-ink text-sm px-3 py-1.5 rounded-md"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-zelda-forest hover:bg-zelda-forest-dark text-white text-sm px-3 py-1.5 rounded-md"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}