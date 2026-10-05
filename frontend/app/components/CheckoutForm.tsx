'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { getStripe } from '@/app/lib/stripe-client';
import { useCart } from '@/app/context/CartContext';
import { createOrderAction } from '@/app/actions/orders';

function CheckoutFormInner() {
  const stripe = useStripe();
  const elements = useElements();
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setIsProcessing(true);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError || !paymentMethod) {
      setError(stripeError?.message ?? 'No se pudo validar la tarjeta');
      setIsProcessing(false);
      return;
    }

    const result = await createOrderAction({
      items: items.map((item) => ({ product_id: item.product.id, quantity: item.quantity })),
      payment_method: paymentMethod.id,
    });

    setIsProcessing(false);

    if (!result.success || !result.order) {
      setError(result.error ?? 'El pago no se pudo completar');
      return;
    }

    clearCart();
    router.push(`/checkout/success?order=${result.order.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-md border border-zelda-ink/20 bg-white p-3">
        <CardElement
          options={{ style: { base: { fontSize: '16px', color: '#2b2118' } } }}
        />
      </div>

      {error && <p className="text-sm text-zelda-ember">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || isProcessing || items.length === 0}
        className="w-full rounded-md bg-zelda-forest px-4 py-3 font-medium text-white hover:bg-zelda-forest-dark disabled:opacity-50"
      >
        {isProcessing ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
      </button>

      <p className="text-xs text-zelda-ink/50">
        Modo de prueba: tarjeta 4242 4242 4242 4242, cualquier fecha futura, cualquier CVC.
      </p>
    </form>
  );
}

export default function CheckoutForm() {
  return (
    <Elements stripe={getStripe()}>
      <CheckoutFormInner />
    </Elements>
  );
}