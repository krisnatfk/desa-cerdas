/**
 * lib/auth.ts
 * Custom lightweight auth system (replaces Clerk for static/semi-dynamic mode).
 * Uses localStorage to persist a demo user session.
 */

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  avatar: string; // initials-based, e.g. "BW"
  role: 'admin' | 'user';
};

const DEMO_USERS: DemoUser[] = [
  {
    id: 'user-admin',
    name: 'Admin DesaMind',
    email: 'admin@desamind.id',
    avatar: 'AD',
    role: 'admin',
  },
  {
    id: 'user-warga',
    name: 'Budi Warga',
    email: 'budi@desamind.id',
    avatar: 'BW',
    role: 'user',
  },
];

const SESSION_KEY = 'desamind_session';

/** Get the currently logged-in user (null if not logged in) */
export function getSession(): DemoUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoUser;
  } catch {
    return null;
  }
}

/** Log in with email. Returns user or null if not found. */
export function login(email: string, _password: string): DemoUser | null {
  const user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

/** Log out */
export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event('auth-change'));
}

/** Register a new demo account */
export function register(name: string, email: string): DemoUser {
  const newUser: DemoUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    avatar: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U',
    role: 'user',
  };
  DEMO_USERS.push(newUser);
  localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  return newUser;
}

/** Available demo accounts for login hint UI */
export const DEMO_ACCOUNTS = DEMO_USERS.map(u => ({
  email: u.email,
  name: u.name,
  role: u.role,
}));
