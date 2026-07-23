'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/dashboard', label: 'Home', icon: '▦' },
  { href: '/wallets', label: 'Wallets', icon: '▣' },
  { href: '/payments', label: 'Pay', icon: '↗' },
  { href: '/ai', label: 'AI', icon: '✦' },
  { href: '/settings', label: 'Settings', icon: '⚙' },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.href} href={item.href} className={active ? 'mobile-nav__item mobile-nav__item--active' : 'mobile-nav__item'} aria-current={active ? 'page' : undefined}>
            <span aria-hidden="true">{item.icon}</span>
            <small>{item.label}</small>
          </Link>
        );
      })}
    </nav>
  );
}
