
# Enerjettix — One Production Zip
Next.js 14 + Tailwind + Firebase (Auth/Firestore) + Stripe (Checkout, Portal) + Stripe Connect (coach payouts).

## Setup
1) npm install
2) copy .env.example to .env.local and fill keys (Firebase web + STRIPE_* + FIREBASE_SERVICE_ACCOUNT JSON)
3) npm run dev

## Stripe
- Replace `price_fit_123` / `price_elite_123` in `/app/pricing/page.tsx`
- Add webhook to `/api/stripe/webhook` (events: checkout.session.completed, customer.subscription.deleted)

## Notes
- Logo already at /public/logo.jpeg (copied from your provided image).
