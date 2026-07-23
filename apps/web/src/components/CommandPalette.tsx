'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const COMMANDS = [
  { label: 'Open dashboard', description: 'Financial overview and AI insights', href: '/dashboard', icon: '▦' },
  { label: 'Manage wallets', description: 'Balances, reserves, and currencies', href: '/wallets', icon: '▣' },
  { label: 'Send a payment', description: 'Prepare a reviewable payment draft', href: '/payments?mode=send', icon: '↗' },
  { label: 'Search transactions', description: 'Inspect the complete ledger', href: '/transactions', icon: '≡' },
  { label: 'Convert currency', description: 'Compare rates and prepare an FX quote', href: '/exchange-rates', icon: '⇄' },
  { label: 'Ask PaymentFlow AI', description: 'Work with specialized financial agents', href: '/ai', icon: '✦' },
  { label: 'Open settings', description: 'Profile, security, and preferences', href: '/settings', icon: '⚙' },
] as const;

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const commands = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return COMMANDS;
    return COMMANDS.filter((command) =>
      `${command.label} ${command.description}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  if (!open) return null;

  function navigate(href: string): void {
    router.push(href);
    setQuery('');
    onClose();
  }

  return (
    <div className="command-palette" role="presentation">
      <button type="button" className="command-palette__backdrop" aria-label="Close search" onClick={onClose} />
      <section className="command-palette__dialog" role="dialog" aria-modal="true" aria-label="Search PaymentFlow">
        <div className="command-palette__input-wrap">
          <span aria-hidden="true">⌕</span>
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages and actions…" />
          <kbd>Esc</kbd>
        </div>
        <div className="command-palette__results">
          <span className="command-palette__label">Navigate</span>
          {commands.map((command) => (
            <button key={command.href} type="button" onClick={() => navigate(command.href)}>
              <span className="command-palette__icon" aria-hidden="true">{command.icon}</span>
              <span><strong>{command.label}</strong><small>{command.description}</small></span>
              <span aria-hidden="true">→</span>
            </button>
          ))}
          {commands.length === 0 && <p className="command-palette__empty">No matching pages or actions.</p>}
        </div>
      </section>
    </div>
  );
}
