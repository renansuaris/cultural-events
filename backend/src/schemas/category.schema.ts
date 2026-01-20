import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '../config/openapi';

extendZodWithOpenApi(z);

const categoryBody = z.object({
  name: z.string().min(3, "O nome da categoria deve ter pelo menos 3 letras").openapi({ example: 'Show de Música' }),
});

export const categorySchema = z.object({
  body: categoryBody,
});

registry.registerPath({
  method: 'post',
  path: '/categories',
  tags: ['Categories'],
  summary: 'Cria uma nova categoria (Admin)',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': { schema: categoryBody }
      }
    }
  },
  responses: {
    201: {
      description: 'Categoria criada',
      content: {
        'application/json': {
          schema: categoryBody.extend({ id: z.string().uuid() })
        }
      }
    },
    409: { description: 'Categoria já existe' }
  }
});

registry.registerPath({
  method: 'get',
  path: '/categories',
  tags: ['Categories'],
  summary: 'Lista todas as categorias',
  responses: {
    200: {
      description: 'Lista de categorias',
      content: {
        'application/json': {
          schema: z.array(categoryBody.extend({ id: z.string().uuid() }))
        }
      }
    }
  }
});

registry.registerPath({
  method: 'delete',
  path: '/categories/{id}',
  tags: ['Categories'],
  summary: 'Deleta uma categoria (Admin)',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string().uuid() })
  },
  responses: {
    204: { description: 'Categoria deletada' }
  }
});