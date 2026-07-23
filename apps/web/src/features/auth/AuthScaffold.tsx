import Link from 'next/link';
import type { ReactNode } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

export interface AuthScaffoldProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthScaffold({ eyebrow, title, description, children, footer }: AuthScaffoldProps) {
  return (
    <main className="auth-page auth-page--lamplight">
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
          {children}
          <div className="auth-page__footer">{footer}</div>
        </div>
        <p className="auth-page__disclaimer">Demo authentication stores test accounts in this browser only. Never enter real banking credentials.</p>
      </section>

      <aside className="auth-page__visual" aria-label="PaymentFlow product preview">
        <div className="lamplight-scene" aria-hidden="true">
          <div className="lamplight-scene__aura" />
          <div className="lamplight-scene__lamp">
            <span className="lamplight-scene__shade" />
            <span className="lamplight-scene__stem" />
            <span className="lamplight-scene__base" />
          </div>
        </div>
        <div className="auth-visual-copy">
          <span>Intelligent money movement</span>
          <h2>See every decision in a clearer light.</h2>
          <p>Unify wallets, approvals, exchange rates, and AI-guided treasury work in one secure workspace.</p>
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
