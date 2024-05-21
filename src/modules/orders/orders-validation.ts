import { z } from 'zod';

const OrderZodSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const byEmail = z.object({
  email: z.string().email().optional(),
});

export { OrderZodSchema, byEmail };
