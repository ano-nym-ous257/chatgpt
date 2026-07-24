import Link from 'next/link';
import type { ReactNode } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LampModeSwitch, type AuthMode } from './LampModeSwitch';

export interface AuthScaffoldProps {
  mode: AuthMode;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

const VISUAL_COPY: Record<AuthMode, { eyebrow: string; title: string; description: string }> = {
  login: {
    eyebrow: 'A brighter way in',
    title: 'New workspace, one pull away.',
    description: 'Pull the lamp cord to reveal account creation without losing the calm, focused flow of the page.',
  },
  signup: {
    eyebrow: 'Return to your workspace',
    title: 'Already set up? Switch the light back.',
    description: 'Pull the lamp cord again to return to secure sign in and continue where your team left off.',
  },
};

export function AuthScaffold({ mode, eyebrow, title, description, children, footer }: AuthScaffoldProps) {
  const visualCopy = VISUAL_COPY[mode];

  return (
    <main className={`auth-page auth-page--lamplight auth-page--${mode}`}>
      <div className="auth-page__theme"><ThemeToggle /></div>
      <section className="auth-page__panel" aria-labelledby="auth-heading">
        <Link href="/login" className="auth-page__brand" aria-label="PaymentFlow AI home">
          <span>PF</span>
          <div><strong>PaymentFlow</strong><small>AI</small></div>
        </Link>
        <div className="auth-page__card">
          <div className="auth-page__copy">
            <span className="auth-page__eyebrow">{eyebrow}</span>
            <h1 id="auth-heading">{title}</h1>
            <p>{description}</p>
          </div>
          <div className="auth-page__mobile-lamp">
            <LampModeSwitch mode={mode} variant="compact" />
          </div>
          {children}
          <div className="auth-page__footer">{footer}</div>
        </div>
        <p className="auth-page__disclaimer">Demo authentication stores test accounts in this browser only. Never enter real banking credentials.</p>
      </section>

      <aside className="auth-page__visual" aria-label="Interactive account mode switch and PaymentFlow preview">
        <LampModeSwitch mode={mode} />
        <div className="auth-visual-copy">
          <span>{visualCopy.eyebrow}</span>
          <h2>{visualCopy.title}</h2>
          <p>{visualCopy.description}</p>
        </div>
        <div className="auth-visual-card auth-visual-card--primary">
          <span>Available balance</span>
          <strong>$284,612.43</strong>
          <small>Healthy runway · 4 wallets funded</small>
        </div>
        <div className="auth-visual-card auth-visual-card--agent">
          <span className="auth-visual-card__agent-mark">✦</span>
          <div><strong>Cashflow agent</strong><p>Friday payroll is covered. Your GBP buffer needs attention.</p></div>
        </div>
        <div className="auth-visual-trust" aria-label="Security highlights">
          <span>256-bit encryption</span><span>Human approvals</span><span>Agent audit trail</span>
        </div>
      </aside>
    </main>
  );
}
