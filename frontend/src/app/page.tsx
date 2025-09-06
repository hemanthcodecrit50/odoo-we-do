"use client";

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/product-card';
import { mockProducts } from '@/lib/products';
import ProductFilters from '@/components/product-filters';
import type { Product } from '@/lib/types';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, category, priceRange]);

  const categories = useMemo(() => ['all', ...Array.from(new Set(mockProducts.map((p) => p.category)))], []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Find Your Next Treasure
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover unique second-hand items and give them a new life. Good for your wallet, great for the planet.
        </p>
      </header>

      <ProductFilters
        categories={categories}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategory}
        onPriceChange={setPriceRange}
        priceRange={priceRange}
      />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No Products Found</h2>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
