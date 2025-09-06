"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

// Mock user data
const mockUser: User = {
  id: 1,
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://i.pravatar.cc/48?u=1',
};

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Avoid hydration mismatch by only accessing localStorage on the client
    try {
      const storedUser = localStorage.getItem('eco-finds-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('eco-finds-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(
    async (email: string, pass: string) => {
      // Mock API call
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (email && pass) {
        setUser(mockUser);
        localStorage.setItem('eco-finds-user', JSON.stringify(mockUser));
        toast({ title: 'Welcome back!', description: 'You have successfully signed in.' });
        router.push('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Sign in failed',
          description: 'Please check your email and password.',
        });
      }
      setLoading(false);
    },
    [router, toast]
  );

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('eco-finds-user');
    toast({ title: 'Signed out', description: 'You have been successfully signed out.' });
    router.push('/');
  }, [router, toast]);

  const value = { user, signIn, signOut, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
