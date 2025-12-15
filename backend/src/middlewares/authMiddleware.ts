import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type TokenPayload = {
  id: string;
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
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET ?? '');
    
    const { id } = decoded as TokenPayload;

    req.userId = id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}