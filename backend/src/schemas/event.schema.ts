import { z } from 'zod';

const eventCore = z.object({
  title: z.string().min(3, "O título é muito curto"),
  date: z.string().min(1, "A data é obrigatória"),
  location: z.string().min(3, "Localização é obrigatória"),
  description: z.string().optional(),
  categoryId: z.string().uuid("Categoria inválida (deve ser um UUID)"),
});

export const createEventSchema = z.object({
  body: eventCore,
});

export const updateEventSchema = z.object({
  body: eventCore.partial(), 
  params: z.object({
    id: z.string(), 
  }),
});