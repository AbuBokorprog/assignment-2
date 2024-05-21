import { z } from 'zod';

const VariantsSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const InventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(VariantsSchema),
  inventory: InventorySchema,
});

export { ProductSchema };
