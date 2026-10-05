# Tiendita — Frontend E-commerce (Next.js)

Frontend en Next.js (App Router) que consume la API REST de e-commerce construida en Laravel 12 + Stripe + Swagger. Implementa catálogo público, autenticación con cookie httpOnly, carrito de compras, pago con Stripe y historial de compras.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Stripe Elements (`@stripe/stripe-js`, `@stripe/react-stripe-js`)
- Consumo de API mediante Server Components (lecturas) y Server Actions (mutaciones)
- Autenticación con token guardado en cookie httpOnly

## Requisitos previos

- Node.js 18+
- El backend de la API corriendo (repositorio `final-api`, Laravel 12 + MySQL + Stripe)

## Configuración

1. Clona el repositorio:
```bash
   git clone https://github.com/<tu-usuario>/tiendita-app.git
   cd tiendita-app
```

2. Instala dependencias:
```bash
   npm install
```

3. Copia el archivo de variables de entorno y complétalo:
```bash
   cp .env.example .env.local
```

   | Variable | Descripción |
   |---|---|
   | `API_URL` | URL base de la API Laravel (ej. `http://127.0.0.1:8000/api`) |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Llave pública de Stripe en modo test (`pk_test_...`) |

4. Levanta el servidor de desarrollo:
```bash
   npm run dev
```

5