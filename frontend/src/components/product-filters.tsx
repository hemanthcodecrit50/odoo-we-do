"use client";

import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

interface ProductFiltersProps {
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: [number, number]) => void;
  priceRange: [number, number];
}

export default function ProductFilters({
  categories,
  onSearchChange,
  onCategoryChange,
  onPriceChange,
  priceRange,
}: ProductFiltersProps) {
  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-1">
          <Input
            placeholder="Search for items..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="text-base"
          />
        </div>
        <div className="md:col-span-1">
          <Select onValueChange={onCategoryChange} defaultValue="all">
            <SelectTrigger className="w-full text-base">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="capitalize">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>Price Range</span>
                <span>${priceRange[0]} - ${priceRange[1]}</span>
            </div>
            <Slider
                defaultValue={[0, 1000]}
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={(value) => onPriceChange(value as [number, number])}
            />
        </div>
      </div>
    </div>
  );
}
