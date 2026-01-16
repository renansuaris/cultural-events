import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';

export class CategoryController {
  
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const userId = req.userId;

    const categoryService = new CategoryService();
    const newCategory = await categoryService.create(name, userId);

    return res.status(201).json(newCategory);
  }

  async list(req: Request, res: Response) {
    const categoryService = new CategoryService();
    const categories = await categoryService.list();
    return res.json(categories);
  }
  
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    const categoryService = new CategoryService();
    await categoryService.delete(id, userId);

    return res.status(204).send();
  }
}