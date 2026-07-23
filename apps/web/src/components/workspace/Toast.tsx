'use client';

import { useEffect } from 'react';

export interface ToastProps {
  message: string;
  tone?: 'success' | 'info' | 'warning';
  onDismiss: () => void;
}

export function Toast({ message, tone = 'success', onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 3500);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={`toast toast--${tone}`} role="status">
      <span className="toast__indicator" aria-hidden="true">{tone === 'success' ? '✓' : '•'}</span>
      <span>{message}</span>
      <button className="toast__close" type="button" onClick={onDismiss} aria-label="Dismiss notification">×</button>
    </div>
  );
}
