'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@paymentflow/ui';
import { AuthScaffold } from '@/features/auth';
import { useAuth } from '@/providers/auth-provider';

function readNextPath(): string {
  if (typeof window === 'undefined') return '/dashboard';
  const value = new URLSearchParams(window.location.search).get('next');
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/dashboard';
}

export default function LoginPage() {
  const router = useRouter();
  const { login, status } = useAuth();
  const [email, setEmail] = useState('michael@northstar.example');
  const [password, setPassword] = useState('paymentflow-demo');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') router.replace(readNextPath());
  }, [router, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setSubmitting(true);
    try {
      await login({ email, password, remember });
      router.replace(readNextPath());
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Sign in failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthScaffold
      eyebrow="Secure workspace access"
      title="Welcome back"
      description="Sign in to manage wallets, approvals, payments, and AI-guided treasury work."
      footer={<p>New to PaymentFlow? <Link href="/signup">Create your workspace</Link></p>}
    >
      <form onSubmit={handleSubmit} className="auth-page__form" noValidate>
        {error && <div className="auth-form-message auth-form-message--error" role="alert">{error}</div>}
        {notice && <div className="auth-form-message auth-form-message--info" role="status">{notice}</div>}
        <Input
          label="Work email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          minLength={8}
          required
        />
        <div className="auth-page__meta">
          <label className="auth-checkbox"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span>Remember this device</span></label>
          <button type="button" onClick={() => setNotice('Password recovery will be connected when production email delivery is configured.')}>Forgot password?</button>
        </div>
        <Button type="submit" className="full-width-button" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
        <button
          type="button"
          className="auth-demo-button"
          onClick={() => { setEmail('michael@northstar.example'); setPassword('paymentflow-demo'); setNotice('Demo credentials loaded.'); }}
        >
          Use demo credentials
        </button>
      </form>
    </AuthScaffold>
  );
}
