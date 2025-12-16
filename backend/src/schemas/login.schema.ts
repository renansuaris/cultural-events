import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(1, "A senha é obrigatória"),
  }),
});