'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { registerAction, type AuthFormState } from '@/app/actions/auth';

const initialState: AuthFormState = { error: null };

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <div className="bg-white p-5 rounded-lg border border-zelda-ink/15 shadow-sm">
      <h2 className="font-bold text-zelda-forest mb-3">Crear Cuenta</h2>

      <form action={formAction} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Nombre (mín 5)"
          className="w-full border border-zelda-ink/20 rounded px-3 py-2 text-sm text-zelda-ink"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-zelda-ink/20 rounded px-3 py-2 text-sm text-zelda-ink"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña (mín 8, mayús, núm, símb)"
          className="w-full border border-zelda-ink/20 rounded px-3 py-2 text-sm text-zelda-ink"
          required
        />

        {state.error && <p className="text-sm text-zelda-ember">{state.error}</p>}
        {state.fieldErrors &&
          Object.entries(state.fieldErrors).map(([field, messages]) => (
            <p key={field} className="text-xs text-zelda-ember/80">
              {messages.join(' ')}
            </p>
          ))}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="bg-zelda-forest hover:bg-zelda-forest-dark disabled:opacity-50 text-white text-sm px-4 py-2 rounded-md font-medium"
          >
            {isPending ? 'Registrando...' : 'Registrarse'}
          </button>
          <Link href="/login" className="text-xs text-zelda-sky hover:underline">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}