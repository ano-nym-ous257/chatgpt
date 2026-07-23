'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@paymentflow/ui';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('michael@northstar.example');
  const [password, setPassword] = useState('paymentflow-demo');

  return (
    <main className="auth-page">
      <section className="auth-page__panel" aria-labelledby="login-heading">
        <div className="auth-page__brand"><span>PF</span><div><strong>PaymentFlow</strong><small>AI</small></div></div>
        <div className="auth-page__copy">
          <span className="workspace-page-header__eyebrow">Secure business workspace</span>
          <h1 id="login-heading">Welcome back</h1>
          <p>Sign in to manage wallets, payments, treasury tasks, and AI-agent recommendations.</p>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); router.push('/dashboard'); }} className="auth-page__form">
          <Input label="Work email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
          <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
          <div className="auth-page__meta"><label><input type="checkbox" defaultChecked /> Remember this device</label><button type="button">Forgot password?</button></div>
          <Button type="submit" className="full-width-button">Sign in to demo</Button>
        </form>
        <p className="auth-page__disclaimer">This deployable MVP uses demonstration authentication and mock financial data. Do not enter real banking credentials.</p>
      </section>
      <aside className="auth-page__visual">
        <div className="auth-visual-card auth-visual-card--primary"><span>Portfolio balance</span><strong>$284,612.43</strong><small>↑ 4.8% this month</small></div>
        <div className="auth-visual-card"><span>PaymentFlow AI</span><p>“Your Friday payroll is covered, but the GBP wallet may fall below its configured buffer.”</p></div>
        <div className="auth-visual-grid"><span>USD</span><span>EUR</span><span>GBP</span><span>GHS</span><span>NGN</span><span>KES</span></div>
      </aside>
    </main>
  );
}
