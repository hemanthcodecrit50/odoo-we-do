const z = require('zod')

export const productCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.number().nonnegative(),
  brand: z.string().optional(),
  model: z.string().optional(),
  material: z.string().optional(),
  color: z.string().optional(),
  originalPackaging: z.boolean().optional(),
  manualIncluded: z.boolean().optional()
});
