import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '../config/openapi';

extendZodWithOpenApi(z);

const loginBody = z.object({
  email: z.string().email("E-mail inválido").openapi({ example: 'admin@email.com' }),
  password: z.string().min(1, "A senha é obrigatória").openapi({ example: '123456' }),
});

export const loginSchema = z.object({
  body: loginBody,
});

registry.registerPath({
  method: 'post',
  path: '/login',
  tags: ['Auth'],
  summary: 'Realiza login e retorna Token JWT',
  request: {
    body: {
      content: {
        'application/json': { schema: loginBody }
      }
    }
  },
  responses: {
    200: {
      description: 'Login realizado',
      content: {
        'application/json': {
          schema: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              role: z.string()
            }),
            token: z.string().openapi({ description: 'Token JWT Bearer' })
          })
        }
      }
    },
    401: { description: 'Credenciais inválidas' }
  }
});