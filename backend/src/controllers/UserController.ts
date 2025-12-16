import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { hash } from 'bcryptjs';

export class UserController {
  
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);

      const userExists = await userRepository.findOneBy({ email });
      if (userExists) {
        return res.status(409).json({ message: 'E-mail já cadastrado' });
      }

      const passwordHash = await hash(password, 10);
      
      const newUser = userRepository.create({
        name,
        email,
        password: passwordHash,
      });

      await userRepository.save(newUser);

      const { password: _, ...userReturn } = newUser;
      
      return res.status(201).json(userReturn);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const loggedUserId = req.userId; 

    if (id !== loggedUserId) {
        return res.status(403).json({ message: "Você não tem permissão para alterar este usuário" });
    }

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id:(id) }); 

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      user.name = name || user.name;
      user.email = email || user.email;

      if (password) {
        user.password = await hash(password, 10);
      }

      await userRepository.save(user);

      const { password: _, ...userReturn } = user;
      return res.json(userReturn);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const loggedUserId = req.userId;

    if (id !== loggedUserId) {
        return res.status(403).json({ message: "Você não tem permissão para deletar este usuário" });
    }

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id }); 

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await userRepository.remove(user);
      return res.status(204).send();

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  }

  async me(req: Request, res: Response) {
    const userId = req.userId; 

    try {
      const userRepository = AppDataSource.getRepository(User);
      
      const user = await userRepository.findOneBy({ id: userId }); 

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const { password: _, ...userReturn } = user;
      
      return res.json(userReturn);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar dados do perfil' });
    }
  }

}