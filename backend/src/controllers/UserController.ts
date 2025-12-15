import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

export class UserController {
  
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    try {
      const userRepository = AppDataSource.getRepository(User);

      const userExists = await userRepository.findOneBy({ email });
      if (userExists) {
        return res.status(409).json({ message: 'E-mail já cadastrado' });
      }
      
      const newUser = userRepository.create({
        name,
        email,
        password,
      });

      await userRepository.save(newUser);

      const { password: _, ...userReturn } = newUser;
      
      return res.status(201).json(userReturn);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}