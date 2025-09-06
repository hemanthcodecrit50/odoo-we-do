"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { mockProducts } from '@/lib/products';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, Share2, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { useCart } from '@/hooks/use-cart';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const product = mockProducts.find((p) => p.id.toString() === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="bg-card rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={600}
            className="w-full object-cover"
            data-ai-hint="product image"
          />
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-sm font-medium text-primary">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold font-headline mt-1">{product.name}</h1>
            <p className="text-3xl font-bold mt-4">${product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4 pt-4 border-t">
            <Avatar>
              <AvatarImage src={product.seller.avatarUrl} alt={product.seller.name} />
              <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Sold by</p>
              <p className="font-semibold">{product.seller.name}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button size="lg" className="flex-1" onClick={() => addToCart(product)} style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)'}}>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <div className="flex gap-4">
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to Wishlist</span>
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-24">
        <h2 className="text-2xl font-bold font-headline mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p}/>
            ))}
        </div>
      </div>
    </div>
  );
}
