"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type AuthFormProps = {
  type: 'login' | 'signup';
};

export default function AuthForm({ type }: AuthFormProps) {
  const { signIn, loading } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn(values.email, values.password);
  }

  const isLogin = type === 'login';

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? 'Sign in to continue to EcoFinds.'
            : 'Join our community of sustainable shoppers.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading} style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)'}}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center text-sm">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <Link href={isLogin ? '/signup' : '/login'} className="font-semibold text-primary hover:underline">
            {isLogin ? 'Sign up' : 'Log in'}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
