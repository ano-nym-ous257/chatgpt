'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@paymentflow/ui';
import { AuthScaffold } from '@/features/auth';
import { useAuth } from '@/providers/auth-provider';

export default function SignupPage() {
  const router = useRouter();
  const { signup, status } = useAuth();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') router.replace('/dashboard');
  }, [router, status]);

  const passwordChecks = useMemo(() => ({
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
  }), [password]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);

    if (!name.trim() || !company.trim() || !email.trim()) return setError('Complete all required fields.');
    if (!Object.values(passwordChecks).every(Boolean)) return setError('Use at least 8 characters with a letter and a number.');
    if (password !== confirmPassword) return setError('Passwords do not match.');
    if (!acceptedTerms) return setError('Accept the terms to create your workspace.');

    setSubmitting(true);
    try {
      await signup({ name, company, email, password });
      router.replace('/dashboard');
    } catch (signupError) {
      setError(signupError instanceof Error ? signupError.message : 'Account creation failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthScaffold
      eyebrow="Create your workspace"
      title="Move money with clarity"
      description="Set up a secure PaymentFlow workspace for your team, wallets, and AI-assisted operations."
      footer={<p>Already have an account? <Link href="/login">Sign in</Link></p>}
    >
      <form onSubmit={handleSubmit} className="auth-page__form" noValidate>
        {error && <div className="auth-form-message auth-form-message--error" role="alert">{error}</div>}
        <div className="auth-form-grid">
          <Input label="Full name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
          <Input label="Business name" value={company} onChange={(event) => setCompany(event.target.value)} autoComplete="organization" required />
        </div>
        <Input label="Work email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
        <div className="auth-form-grid">
          <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required />
          <Input label="Confirm password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required />
        </div>
        <ul className="password-checks" aria-label="Password requirements">
          <li className={passwordChecks.length ? 'is-valid' : ''}>8+ characters</li>
          <li className={passwordChecks.letter ? 'is-valid' : ''}>One letter</li>
          <li className={passwordChecks.number ? 'is-valid' : ''}>One number</li>
        </ul>
        <label className="auth-checkbox auth-checkbox--terms">
          <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
          <span>I agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</span>
        </label>
        <Button type="submit" className="full-width-button" disabled={submitting}>
          {submitting ? 'Creating workspace…' : 'Create workspace'}
        </Button>
      </form>
    </AuthScaffold>
  );
}
