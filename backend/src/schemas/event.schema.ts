import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '../config/openapi'; 

extendZodWithOpenApi(z);

const eventSchema = z.object({
  title: z.string().min(3).openapi({ example: 'Show de Rock' }),
  date: z.string().datetime().openapi({ example: '2023-12-25T20:00:00Z' }),
  location: z.string().min(3).openapi({ example: 'Teatro Municipal' }),
  description: z.string().optional().openapi({ example: 'Um show incrível...' }),
  categoryId: z.string().uuid().openapi({ example: 'uuid-da-categoria-aqui' }),
});

export const createEventSchema = z.object({
  body: eventSchema,
});

export const updateEventSchema = z.object({
  body: eventSchema.partial(),
  params: z.object({ id: z.string().uuid() }),
});

registry.registerPath({
  method: 'post',
  path: '/events',
  tags: ['Events'],
  summary: 'Cria um novo evento',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: eventSchema, 
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Evento criado com sucesso',
      content: {
        'application/json': {
          schema: eventSchema.extend({ id: z.string(), userId: z.string() }),
        },
      },
    },
    400: { description: 'Erro de validação' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/events/{id}',
  tags: ['Events'],
  summary: 'Busca um evento pelo ID',
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    200: {
      description: 'Detalhes do evento',
      content: {
        'application/json': {
          schema: eventSchema.extend({ 
            id: z.string(), 
            userId: z.string(),
            category: z.object({ id: z.string(), name: z.string() }).optional(),
            user: z.object({ id: z.string(), name: z.string() }).optional()
          }),
        },
      },
    },
    404: { description: 'Evento não encontrado' },
  },
});

registry.registerPath({
  method: 'put',
  path: '/events/{id}',
  tags: ['Events'],
  summary: 'Atualiza um evento',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string().uuid() }),
    body: {
      content: {
        'application/json': { 
          schema: eventSchema.partial() 
        },
      },
    },
  },
  responses: {
    200: { description: 'Evento atualizado com sucesso' },
    403: { description: 'Sem permissão (Não é dono nem Admin)' },
    404: { description: 'Evento não encontrado' },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/events/{id}',
  tags: ['Events'],
  summary: 'Deleta um evento',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    204: { description: 'Evento deletado com sucesso' },
    403: { description: 'Sem permissão (Não é dono nem Admin)' },
    404: { description: 'Evento não encontrado' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/events',
  tags: ['Events'],
  summary: 'Lista eventos',
  request: {
    query: z.object({
      page: z.string().optional().openapi({ example: '1' }),
      limit: z.string().optional().openapi({ example: '10' }),
      categoryId: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: 'Lista de eventos',
      content: {
        'application/json': {
          schema: z.object({
            data: z.array(eventSchema),
            total: z.number(),
          }),
        },
      },
    },
  },
});