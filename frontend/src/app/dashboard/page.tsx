"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { mockProducts } from '@/lib/products';
import ProductCard from '@/components/product-card';

function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4 mb-8">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="h-10 w-full max-w-sm" />
      <div className="mt-6">
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <DashboardSkeleton />;
  }
  
  const userListings = mockProducts.filter(p => p.seller.id === user.id);
  const userPurchases = mockProducts.slice(0, 2); // Mock purchases

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold font-headline">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </header>

      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid w-full max-w-lg grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="purchases">My Purchases</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Full Name</p>
                <p className="text-muted-foreground">{user.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Email Address</p>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Button>Edit Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="mt-6">
            {userListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {userListings.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <Card className="text-center py-16">
                    <CardHeader>
                        <CardTitle>You haven't listed any items yet.</CardTitle>
                        <CardDescription>Ready to give your pre-loved items a new home?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)'}}>
                            <a href="/sell">List Your First Item</a>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </TabsContent>

        <TabsContent value="purchases" className="mt-6">
           {userPurchases.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {userPurchases.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <Card className="text-center py-16">
                    <CardHeader>
                        <CardTitle>No purchases yet.</CardTitle>
                        <CardDescription>Start shopping to see your purchased items here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)'}}>
                            <a href="/">Explore Products</a>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
