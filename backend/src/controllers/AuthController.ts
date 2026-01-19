import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.authService.logar({ email, password });
    return res.json(result);
  }
}