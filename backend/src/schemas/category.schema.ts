import { z } from 'zod';

export const categorySchema = z.object({
  body: z.object({
    name: z.string().min(3, "O nome da categoria deve ter pelo menos 3 letras"),
  }),
});