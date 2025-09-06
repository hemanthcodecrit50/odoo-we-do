"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/product/${product.id}`} className="flex-grow">
        <CardHeader className="p-0">
          <div className="aspect-w-4 aspect-h-3">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={400}
              className="object-cover w-full h-full"
              data-ai-hint="product image"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold leading-tight mb-1">{product.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-bold">
          ${product.price.toFixed(2)}
        </p>
        <Button size="icon" variant="outline" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>
          <ShoppingBag className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
