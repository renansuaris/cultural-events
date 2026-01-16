import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';

export class CategoryController {
  
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const { userId, userRole } = req;

    const categoryService = new CategoryService();
    const newCategory = await categoryService.create(name, userId, userRole);

    return res.status(201).json(newCategory);
  }

  async list(req: Request, res: Response) {
    const categoryService = new CategoryService();
    const categories = await categoryService.list();
    return res.json(categories);
  }
  
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, userRole } = req;

    const categoryService = new CategoryService();
    await categoryService.delete(id, userId, userRole);

    return res.status(204).send();
  }
}