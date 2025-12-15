import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class AuthController {
  
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '1d' });

    const { password: _, ...userReturn } = user;

    return res.json({
      user: userReturn,
      token,
    });
  }
}