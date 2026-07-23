import type { MetadataRoute } from 'next';

const ROUTES = ['/dashboard', '/wallets', '/payments', '/transactions', '/exchange-rates', '/ai', '/settings', '/login', '/signup'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://paymentflow-ai.vercel.app';
  return ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-07-23T00:00:00Z'),
    changeFrequency: 'weekly',
    priority: route === '/dashboard' ? 1 : 0.7,
  }));
}
