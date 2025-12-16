import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
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