import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';

export class CategoryController {

  constructor(private categoryService: CategoryService) {}
  
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const { userId, userRole } = req;
    const newCategory = await this.categoryService.create(name, userId, userRole);
    return res.status(201).json(newCategory);
  }

  async list(req: Request, res: Response) {
    const categories = await this.categoryService.list();
    return res.json(categories);
  }
  
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, userRole } = req;
    await this.categoryService.delete(id, userId, userRole);
    return res.status(204).send();
  }
}