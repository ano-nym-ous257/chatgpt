# Vercel Deployment

## Project settings

- Framework preset: Next.js
- Root directory: `apps/web`
- Install command: default (`pnpm install`)
- Build command: `cd ../.. && pnpm exec turbo run build --filter=@paymentflow/web`
- Output directory: `.next`
- Node.js: 20.x or 22.x

Enable source files outside the root directory so the web application can consume workspace packages.

## Environment variables

No environment variables are required for the demonstration deployment. See `.env.example` for future integration placeholders.

## Verification

After deployment, verify:

- `/dashboard`
- `/wallets`
- `/payments`
- `/transactions`
- `/exchange-rates`
- `/ai`
- `/settings`
- `/login`
- `/api/health`
