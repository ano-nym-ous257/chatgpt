'use client';

import { useEffect } from 'react';
import { Button } from '@paymentflow/ui';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="system-page">
      <span className="system-page__code">!</span>
      <h1>Something interrupted the workspace</h1>
      <p>Your data was not changed. Retry the page or return to the dashboard.</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
