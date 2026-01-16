import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '../config/openapi';

extendZodWithOpenApi(z);

const userCore = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres").openapi({ example: 'Renan Alencar' }),
  email: z.string().email("Formato de e-mail inválido").openapi({ example: 'renan@email.com' }),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").openapi({ example: '123456' }),
});

export const createUserSchema = z.object({
  body: userCore,
});

export const updateUserSchema = z.object({
  body: userCore.partial(), 
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const updateRoleSchema = z.object({
  body: z.object({
    role: z.enum(['admin', 'user']).openapi({ example: 'admin' }),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

registry.registerPath({
  method: 'post',
  path: '/users',
  tags: ['Users'],
  summary: 'Cria um novo usuário',
  request: {
    body: {
      content: {
        'application/json': { schema: userCore }
      }
    }
  },
  responses: {
    201: {
      description: 'Usuário criado com sucesso',
      content: {
        'application/json': {
          schema: userCore.omit({ password: true }).extend({ id: z.string().uuid(), role: z.string() })
        }
      }
    },
    409: { description: 'Email já cadastrado' }
  }
});

registry.registerPath({
  method: 'get',
  path: '/users/me',
  tags: ['Users'],
  summary: 'Retorna dados do usuário logado',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Perfil do usuário',
      content: {
        'application/json': {
          schema: userCore.omit({ password: true }).extend({ id: z.string().uuid(), role: z.string() })
        }
      }
    }
  }
});

registry.registerPath({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'Lista todos os usuários (Admin)',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Lista de usuários',
      content: {
        'application/json': {
          schema: z.array(userCore.omit({ password: true }).extend({ id: z.string().uuid(), role: z.string() }))
        }
      }
    }
  }
});

registry.registerPath({
  method: 'put',
  path: '/users/{id}',
  tags: ['Users'],
  summary: 'Atualiza dados do usuário',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string().uuid() }),
    body: {
      content: {
        'application/json': { schema: userCore.partial() }
      }
    }
  },
  responses: {
    200: { description: 'Usuário atualizado' },
    403: { description: 'Sem permissão' }
  }
});

registry.registerPath({
  method: 'patch',
  path: '/users/{id}/role',
  tags: ['Users'],
  summary: 'Altera o papel do usuário (Admin)',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string().uuid() }),
    body: {
      content: {
        'application/json': { schema: z.object({ role: z.enum(['admin', 'user']) }) }
      }
    }
  },
  responses: {
    200: { description: 'Papel atualizado' }
  }
});

registry.registerPath({
  method: 'delete',
  path: '/users/{id}',
  tags: ['Users'],
  summary: 'Deleta um usuário',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    204: { description: 'Usuário deletado' }
  }
});