'use client';

import type { ReactNode } from 'react';

export interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return <>{children}</>;
}
