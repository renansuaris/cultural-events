import { z } from 'zod';

const userCore = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const createUserSchema = z.object({
  body: userCore,
});

export const updateUserSchema = z.object({
  body: userCore.partial(), 
  params: z.object({
    id: z.string(),
  }),
});