import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {

  constructor(private userService: UserService) {}

  async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body);
    return res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const loggedUserId = req.userId;
    const user = await this.userService.update(id, loggedUserId, req.body);
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, userRole } = req;
    await this.userService.delete(id, userId, userRole);
    return res.status(204).send();
  }

  async me(req: Request, res: Response) {
    const user = await this.userService.getProfile(req.userId);
    return res.json(user);
  }

  async index(req: Request, res: Response) {
    const { userRole } = req;
    const users = await this.userService.listAll(userRole);
    return res.json(users);
  }

  async updateRole(req: Request, res: Response) {
    const { id } = req.params;
    const { role } = req.body;
    const { userId, userRole } = req;
    await this.userService.updateRole(id, role, userId, userRole);
    return res.json({ message: "Papel atualizado com sucesso" });
  }
}
