"use client";

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutGrid, PlusCircle, ShoppingBag, User } from 'lucide-react';
import Logo from './logo';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from './ui/skeleton';
import { useCart } from '@/hooks/use-cart';
import CartSheet from './cart-sheet';
import { useState } from 'react';

export default function Header() {
  const { user, signOut, loading } = useAuth();
  const { cartCount } = useCart();
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Shop
          </Link>
          <Link href="/sell" className="transition-colors hover:text-primary">
            Sell
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-primary">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <CartSheet open={isCartOpen} onOpenChange={setCartOpen}>
            <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)} className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-accent-foreground bg-accent rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </CartSheet>

          {loading ? (
            <Skeleton className="h-8 w-8 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/sell">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>List an Item</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)'}}>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}
           <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon">
                   <User className="h-5 w-5"/>
                 </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                 <DropdownMenuItem asChild><Link href="/login">Log In</Link></DropdownMenuItem>
                 <DropdownMenuItem asChild><Link href="/signup">Sign Up</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
           </div>
        </div>
      </div>
    </header>
  );
}
