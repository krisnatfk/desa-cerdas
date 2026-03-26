'use client';
/**
 * hooks/useAuth.ts
 * React hook that tracks auth state from localStorage.
 */
import { useState, useEffect, useCallback } from 'react';
import { getSession, login as authLogin, logout as authLogout, register as authRegister, type DemoUser } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(getSession());
    };
    
    // Initial fetch
    handleAuthChange();
    setLoading(false);

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const u = authLogin(email, password);
    setUser(u);
    window.dispatchEvent(new Event('auth-change'));
    return u;
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
  }, []);

  const register = useCallback((name: string, email: string) => {
    const u = authRegister(name, email);
    setUser(u);
    window.dispatchEvent(new Event('auth-change'));
    return u;
  }, []);

  return {
    user,
    loading,
    isSignedIn: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    register,
  };
}
