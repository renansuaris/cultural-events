import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/AppErrors';

type TokenPayload = {
  id: string;
  role: string;
  iat: number;
  exp: number;
};

export async function authMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Token não fornecido');
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET ?? '');
    
    const { id, role } = decoded as TokenPayload;

    req.userId = id;
    req.userRole = role;

    return next();
  } catch (error) {
    throw new UnauthorizedError('Token inválido ou expirado');
  }
}