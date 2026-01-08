import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Category } from '../entities/Category';
import { User } from '../entities/User';

export class CategoryController {
  
  
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const userId = req.userId;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const requester = await userRepository.findOneBy({ id: userId });

      if (requester?.role !== 'admin') {
        return res.status(403).json({ message: 'Apenas administradores podem criar categorias' });
      }

      const categoryRepository = AppDataSource.getRepository(Category);

      const categoryExists = await categoryRepository.findOneBy({ name });
      if (categoryExists) {
        return res.status(409).json({ message: 'Categoria já existe' });
      }

      const newCategory = categoryRepository.create({ name });
      await categoryRepository.save(newCategory);

      return res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      const categories = await categoryRepository.find();

      return res.json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar categorias' });
    }
  }
  
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const requester = await userRepository.findOneBy({ id: userId });

      if (requester?.role !== 'admin') {
        return res.status(403).json({ message: 'Apenas administradores podem deletar categorias' });
      }
      
      const categoryRepository = AppDataSource.getRepository(Category);
      
      const category = await categoryRepository.findOneBy({ id });

      if (!category) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }

      await categoryRepository.remove(category);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar categoria' });
    }
  }
}