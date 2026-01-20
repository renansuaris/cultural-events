import { NextFunction, Request, Response } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate = (schema: ZodObject<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {

    const result = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    req.body = result.body;

    Object.defineProperty(req, 'query', {
      value: result.query,
      writable: true,
      configurable: true
    });

    Object.defineProperty(req, 'params', {
      value: result.params,
      writable: true,
      configurable: true
    });

    return next();
  } catch (error) {
    console.error("Erro de Validação Zod:", error);

    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: error.issues.map((err) => ({
          field: err.path[1] ? err.path[1] : (err.path[0] || 'unknown'), 
          message: err.message,
        })),
      });
    }
    
    return res.status(500).json({ message: 'Erro interno na validação' });
  }
};