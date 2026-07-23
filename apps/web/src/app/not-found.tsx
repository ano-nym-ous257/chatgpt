import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="system-page">
      <span className="system-page__code">404</span>
      <h1>We could not find that page</h1>
      <p>The destination may have moved, or the link may no longer be available.</p>
      <Link href="/dashboard" className="btn btn--primary">Return to dashboard</Link>
    </main>
  );
}
