"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Wand2, Loader2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateProductDetails } from '@/ai/flows/generate-product-details';

const sellFormSchema = z.object({
  photo: z.any().refine((file) => file instanceof File, 'Photo is required.'),
  category: z.string().min(1, 'Category is required.'),
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
});

const categories = ['Apparel', 'Furniture', 'Electronics', 'Home Goods', 'Books', 'Other'];

export default function SellForm() {
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof sellFormSchema>>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      category: '',
      title: '',
      description: '',
      price: 0,
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('photo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateDetails = async () => {
    const category = form.getValues('category');
    if (!photoPreview || !category) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please upload a photo and select a category first.',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateProductDetails({
        photoDataUri: photoPreview,
        category,
      });
      form.setValue('title', result.title);
      form.setValue('description', result.description);
      toast({
        title: 'Details Generated!',
        description: 'The title and description have been filled in for you.',
      });
    } catch (error) {
      console.error('Failed to generate product details:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate details. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = (values: z.infer<typeof sellFormSchema>) => {
    console.log(values);
    toast({
      title: 'Item Listed!',
      description: `${values.title} is now available on EcoFinds.`,
    });
    form.reset();
    setPhotoPreview(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Photo</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                    {photoPreview ? (
                      <Image src={photoPreview} alt="Product preview" width={128} height={128} className="object-cover w-full h-full" />
                    ) : (
                      <ImageIcon className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>
                  <Input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id="photo-upload" />
                  <Button type="button" variant="outline" asChild>
                    <label htmlFor="photo-upload">Choose Image</label>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2 relative">
            <Button
                type="button"
                variant="outline"
                onClick={handleGenerateDetails}
                disabled={isGenerating || !photoPreview || !form.getValues('category')}
                className="absolute -top-1 right-0"
            >
                {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate with AI
            </Button>
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Vintage Leather Jacket" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your item in detail..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price ($)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="25.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full" disabled={isGenerating} style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)'}}>
          List Item
        </Button>
      </form>
    </Form>
  );
}
