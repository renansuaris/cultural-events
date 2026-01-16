import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userService = new UserService();
    const user = await userService.create({ name, email, password });
    return res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const loggedUserId = req.userId; 

    const userService = new UserService();
    const user = await userService.update(id, loggedUserId, { name, email, password });
    
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const loggedUserId = req.userId;

    const userService = new UserService();
    await userService.delete(id, loggedUserId);

    return res.status(204).send();
  }

  async me(req: Request, res: Response) {
    const userService = new UserService();
    const user = await userService.getProfile(req.userId);
    return res.json(user);
  }

  async index(req: Request, res: Response) {
    const userService = new UserService();
    const users = await userService.listAll(req.userId);
    return res.json(users);
  }

  async updateRole(req: Request, res: Response) {
    const { id } = req.params;
    const { role } = req.body;
    const loggedUserId = req.userId;

    const userService = new UserService();
    await userService.updateRole(id, role, loggedUserId);
    return res.json({ message: 'Papel atualizado com sucesso' });
  }
}