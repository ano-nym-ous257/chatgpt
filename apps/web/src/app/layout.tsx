import type { Metadata, Viewport } from 'next';
import { AppProviders } from '@/providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'PaymentFlow AI',
    template: '%s · PaymentFlow AI',
  },
  description: 'AI-powered global payments, wallets, and treasury workspace.',
  applicationName: 'PaymentFlow AI',
  manifest: '/manifest.webmanifest',
  icons: { icon: '/icon.svg' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050a12',
};

const themeBootstrap = `(function(){try{var t=localStorage.getItem('paymentflow.theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
