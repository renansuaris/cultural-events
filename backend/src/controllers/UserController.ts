import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { hash } from 'bcryptjs';
import { AppError } from '../errors/AppErrors';
import { th } from 'zod/v4/locales';

export class UserController {
  
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOneBy({ email });
    if (userExists) {
      throw new AppError('Email já cadastrado', 400);
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
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const loggedUserId = req.userId; 

    if (id !== loggedUserId) {
        throw new AppError('Sem permissão para atualizar este usuário', 403);
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id:(id) }); 

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await hash(password, 10);
    }

    await userRepository.save(user);

    const { password: _, ...userReturn } = user;
    return res.json(userReturn);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const loggedUserId = req.userId;

    const userRepository = AppDataSource.getRepository(User);
      
    const requester = await userRepository.findOneBy({ id: loggedUserId });
      
    if (id !== loggedUserId && requester?.role !== 'admin') {
      throw new AppError('Sem permissão para deletar este usuário', 403);
    }

    const user = await userRepository.findOneBy({ id }); 
    if (!user) throw new AppError('Usuário não encontrado', 404);

    await userRepository.remove(user);
    return res.status(204).send();
}

  async me(req: Request, res: Response) {
    const userId = req.userId; 

    const userRepository = AppDataSource.getRepository(User);
      
    const user = await userRepository.findOneBy({ id: userId }); 

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const { password: _, ...userReturn } = user;
      
      return res.json(userReturn);
  }

  async index(req: Request, res: Response) {
    const loggedUserId = req.userId;

    const userRepository = AppDataSource.getRepository(User);
      
    const requester = await userRepository.findOneBy({ id: loggedUserId });
    if (requester?.role !== 'admin') {
      throw new AppError('Acesso negado: Apenas administradores', 403);
    }

    const users = await userRepository.find();

    const usersReturn = users.map(user => {
      const { password: _, ...userData } = user;
      return userData;
    });

      return res.json(usersReturn);
    
  }

  async updateRole(req: Request, res: Response) {
    const { id } = req.params;
    const { role } = req.body;
    const loggedUserId = req.userId;

    const userRepository = AppDataSource.getRepository(User);

    const requester = await userRepository.findOneBy({ id: loggedUserId });
    if (requester?.role !== 'admin') {
      throw new AppError('Apenas administradores podem alterar permissões', 403);
    }
      
    const user = await userRepository.findOneBy({ id }); 

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    user.role = role;
    await userRepository.save(user);

    return res.json({ message: 'Papel atualizado com sucesso' });
  }

}