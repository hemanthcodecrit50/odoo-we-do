'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating product titles and descriptions based on an image and category.
 *
 * - generateProductDetails - A function that takes an image data URI and category as input and returns a generated product title and description.
 * - GenerateProductDetailsInput - The input type for the generateProductDetails function.
 * - GenerateProductDetailsOutput - The return type for the generateProductDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDetailsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  category: z.string().describe('The category of the product being listed.'),
});
export type GenerateProductDetailsInput = z.infer<typeof GenerateProductDetailsInputSchema>;

const GenerateProductDetailsOutputSchema = z.object({
  title: z.string().describe('A suggested title for the product listing.'),
  description: z.string().describe('A suggested description for the product listing.'),
});
export type GenerateProductDetailsOutput = z.infer<typeof GenerateProductDetailsOutputSchema>;

export async function generateProductDetails(
  input: GenerateProductDetailsInput
): Promise<GenerateProductDetailsOutput> {
  return generateProductDetailsFlow(input);
}

const generateProductDetailsPrompt = ai.definePrompt({
  name: 'generateProductDetailsPrompt',
  input: {schema: GenerateProductDetailsInputSchema},
  output: {schema: GenerateProductDetailsOutputSchema},
  prompt: `You are an expert in writing compelling titles and descriptions for second-hand product listings.

  Based on the image and category provided, generate a title and description that will attract potential buyers.

  Category: {{{category}}}
  Image: {{media url=photoDataUri}}

  Title:`,
});

const generateProductDetailsFlow = ai.defineFlow(
  {
    name: 'generateProductDetailsFlow',
    inputSchema: GenerateProductDetailsInputSchema,
    outputSchema: GenerateProductDetailsOutputSchema,
  },
  async input => {
    const {output} = await generateProductDetailsPrompt(input);
    return output!;
  }
);
