'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  initials: string;
}

export interface LoginInput {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignupInput {
  name: string;
  email: string;
  company: string;
  password: string;
}

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface StoredAccount {
  user: AuthUser;
  salt: string;
  passwordHash: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => void;
  updateProfile: (input: Pick<AuthUser, 'name' | 'email' | 'company'>) => void;
}

const SESSION_KEY = 'paymentflow.demo.session';
const ACCOUNTS_KEY = 'paymentflow.demo.accounts';
const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_USER: AuthUser = {
  id: 'demo-michael-richardson',
  name: 'Michael Richardson',
  email: 'michael@northstar.example',
  company: 'Northstar Commerce Ltd.',
  role: 'Finance Manager',
  initials: 'MR',
};

function initialsFor(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'PF';
}

function readJson<T>(storage: Storage, key: string, fallback: T): T {
  try {
    const value = storage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const payload = new TextEncoder().encode(`${salt}:${password}`);
  return bytesToHex(await window.crypto.subtle.digest('SHA-256', payload));
}

function makeSalt(): string {
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function writeSession(user: AuthUser, remember: boolean): void {
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
  const target = remember ? window.localStorage : window.sessionStorage;
  target.setItem(SESSION_KEY, JSON.stringify(user));
}

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const session =
      readJson<AuthUser | null>(window.localStorage, SESSION_KEY, null) ??
      readJson<AuthUser | null>(window.sessionStorage, SESSION_KEY, null);
    setUser(session);
    setStatus(session ? 'authenticated' : 'unauthenticated');
  }, []);

  const login = useCallback(async ({ email, password, remember }: LoginInput) => {
    const normalizedEmail = email.trim().toLowerCase();
    let nextUser: AuthUser | null = null;

    if (normalizedEmail === DEMO_USER.email && password === 'paymentflow-demo') {
      nextUser = DEMO_USER;
    } else {
      const accounts = readJson<StoredAccount[]>(window.localStorage, ACCOUNTS_KEY, []);
      const account = accounts.find((candidate) => candidate.user.email === normalizedEmail);
      if (account && (await hashPassword(password, account.salt)) === account.passwordHash) {
        nextUser = account.user;
      }
    }

    if (!nextUser) {
      throw new Error('Email or password is incorrect. Use the demo credentials or create an account.');
    }

    writeSession(nextUser, remember);
    setUser(nextUser);
    setStatus('authenticated');
  }, []);

  const signup = useCallback(async ({ name, email, company, password }: SignupInput) => {
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = readJson<StoredAccount[]>(window.localStorage, ACCOUNTS_KEY, []);

    if (normalizedEmail === DEMO_USER.email || accounts.some((account) => account.user.email === normalizedEmail)) {
      throw new Error('An account with this email already exists. Sign in instead.');
    }

    const nextUser: AuthUser = {
      id: window.crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      company: company.trim(),
      role: 'Workspace Owner',
      initials: initialsFor(name),
    };
    const salt = makeSalt();
    const passwordHash = await hashPassword(password, salt);
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, { user: nextUser, salt, passwordHash }]));
    writeSession(nextUser, true);
    setUser(nextUser);
    setStatus('authenticated');
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const updateProfile = useCallback((input: Pick<AuthUser, 'name' | 'email' | 'company'>) => {
    setUser((current) => {
      if (!current) return current;
      const updated = { ...current, ...input, email: input.email.trim().toLowerCase(), initials: initialsFor(input.name) };
      if (window.localStorage.getItem(SESSION_KEY)) window.localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
      if (window.sessionStorage.getItem(SESSION_KEY)) window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated));

      const accounts = readJson<StoredAccount[]>(window.localStorage, ACCOUNTS_KEY, []);
      const updatedAccounts = accounts.map((account) => account.user.id === current.id ? { ...account, user: updated } : account);
      window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
      return updated;
    });
  }, []);

  const value = useMemo(
    () => ({ user, status, login, signup, logout, updateProfile }),
    [login, logout, signup, status, updateProfile, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
