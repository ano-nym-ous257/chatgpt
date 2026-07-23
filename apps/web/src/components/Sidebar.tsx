'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly icon: React.ReactNode;
  readonly group?: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="10" y="2" width="6" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="10" y="8" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    href: '/wallets',
    label: 'Wallets',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 7h14" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="13" cy="10.5" r="1" fill="currentColor" />
      </svg>
    ),
    group: 'Finance',
  },
  {
    href: '/payments',
    label: 'Payments',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M9 2v14M5 6l4-4 4 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/transactions',
    label: 'Transactions',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M3 6h12M3 10h8M3 14h5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: '/exchange-rates',
    label: 'Exchange Rates',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M4 7l4-4 4 4M14 11l-4 4-4-4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: '/ai',
    label: 'AI Workspace',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2l1.4 4.1L14.5 7.5l-4.1 1.4L9 13l-1.4-4.1-4.1-1.4 4.1-1.4L9 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M14.5 12l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6.6-1.9z" fill="currentColor" />
      </svg>
    ),
    group: 'Intelligence',
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M9 2v2M9 14v2M2 9h2M14 9h2M4.2 4.2l1.4 1.4M12.4 12.4l1.4 1.4M4.2 13.8l1.4-1.4M12.4 5.6l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    group: 'System',
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  let currentGroup: string | undefined;

  return (
    <aside
      className={`shell__sidebar sidebar${isOpen ? ' sidebar--open' : ''}`}
      aria-label="Main navigation"
    >
      <button
        type="button"
        className="sidebar__close-btn"
        onClick={onClose}
        aria-label="Close navigation"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M4 4l8 8M12 4l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="sidebar__brand">
        <span className="sidebar__brand-logo">PF</span>
        <div className="sidebar__brand-text">
          <span className="sidebar__brand-name">PaymentFlow</span>
          <span className="sidebar__brand-tier">Enterprise</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__list" role="list">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const showGroup = item.group && item.group !== currentGroup;
            if (item.group) currentGroup = item.group;

            return (
              <li key={item.href}>
                {showGroup && <span className="sidebar__group-label">{item.group}</span>}
                <Link
                  href={item.href}
                  className={`sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="sidebar__icon">{item.icon}</span>
                  <span className="sidebar__label">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__user-avatar">
            <span>MR</span>
          </div>
          <div className="sidebar__user-info">
            <span className="sidebar__user-name">Michael R.</span>
            <span className="sidebar__user-role">Finance Manager</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
