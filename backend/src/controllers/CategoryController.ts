import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Category } from '../entities/Category';
import { User } from '../entities/User';
import { AppError } from '../errors/AppErrors';

export class CategoryController {
  
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const userId = req.userId;

    const userRepository = AppDataSource.getRepository(User);
    const requester = await userRepository.findOneBy({ id: userId });

    if (requester?.role !== 'admin') {
      throw new AppError('Apenas administradores podem criar categorias', 403);
    }

    const categoryRepository = AppDataSource.getRepository(Category);

    const categoryExists = await categoryRepository.findOneBy({ name });
    if (categoryExists) {
      throw new AppError('Categoria já existe', 409);
    }

    const newCategory = categoryRepository.create({ name });
    await categoryRepository.save(newCategory);

    return res.status(201).json(newCategory);
  }

  async list(req: Request, res: Response) {
    const categoryRepository = AppDataSource.getRepository(Category);
    const categories = await categoryRepository.find();
    return res.json(categories);
  }
  
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    const userRepository = AppDataSource.getRepository(User);
    const requester = await userRepository.findOneBy({ id: userId });

    if (requester?.role !== 'admin') {
      throw new AppError('Apenas administradores podem deletar categorias', 403);
    }

    const categoryRepository = AppDataSource.getRepository(Category);
      
    const category = await categoryRepository.findOneBy({ id });

    if (!category) {
      throw new AppError('Categoria não encontrada', 404);
    }

    await categoryRepository.remove(category);

    return res.status(204).send();
  }
}