'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router, status]);

  if (status !== 'authenticated') {
    return (
      <main className="auth-guard" aria-live="polite">
        <span className="auth-guard__mark">PF</span>
        <span className="auth-guard__spinner" aria-hidden="true" />
        <p>{status === 'loading' ? 'Restoring your secure workspace…' : 'Taking you to sign in…'}</p>
      </main>
    );
  }

  return children;
}
