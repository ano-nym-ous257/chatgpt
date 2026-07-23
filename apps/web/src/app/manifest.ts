import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PaymentFlow AI',
    short_name: 'PaymentFlow',
    description: 'AI-powered global payments and treasury workspace',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#050a12',
    theme_color: '#050a12',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
