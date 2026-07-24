'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export type AuthMode = 'login' | 'signup';

export interface LampModeSwitchProps {
  mode: AuthMode;
  variant?: 'scene' | 'compact';
}

const SWITCH_DELAY_MS = 520;

export function LampModeSwitch({ mode, variant = 'scene' }: LampModeSwitchProps) {
  const router = useRouter();
  const [switching, setSwitching] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const targetMode: AuthMode = mode === 'login' ? 'signup' : 'login';
  const targetPath = targetMode === 'signup' ? '/signup' : '/login';
  const targetLabel = targetMode === 'signup' ? 'create an account' : 'sign in';

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  function pullSwitch(): void {
    if (switching) return;
    setSwitching(true);
    timeoutRef.current = setTimeout(() => router.push(targetPath), SWITCH_DELAY_MS);
  }

  return (
    <div
      className={`lamp-mode-switch lamp-mode-switch--${variant} lamp-mode-switch--${mode}${switching ? ' is-switching' : ''}`}
      data-auth-mode={mode}
    >
      <div className="lamp-mode-switch__aura" aria-hidden="true" />
      <div className="lamp-mode-switch__lamp" aria-hidden="true">
        <span className="lamp-mode-switch__shade" />
        <span className="lamp-mode-switch__bulb" />
        <span className="lamp-mode-switch__stem" />
        <span className="lamp-mode-switch__base" />
      </div>

      <button
        type="button"
        className="lamp-mode-switch__pull"
        onClick={pullSwitch}
        disabled={switching}
        aria-label={`Pull the lamp switch to ${targetLabel}`}
        aria-describedby={`lamp-switch-hint-${variant}`}
      >
        <span className="lamp-mode-switch__chain" aria-hidden="true" />
        <span className="lamp-mode-switch__handle" aria-hidden="true" />
        <span className="lamp-mode-switch__button-label">
          {switching ? 'Switching…' : 'Pull switch'}
        </span>
      </button>

      <p id={`lamp-switch-hint-${variant}`} className="lamp-mode-switch__hint">
        <strong>{mode === 'login' ? 'New to PaymentFlow?' : 'Already have a workspace?'}</strong>
        <span>Pull the cord to {targetLabel}.</span>
      </p>
    </div>
  );
}
