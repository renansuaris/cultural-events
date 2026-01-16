import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const authService = new AuthService();
    
    const result = await authService.logar({ email, password });

    return res.json(result);
  }
}