import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Category } from '../entities/Category';

export class CategoryController {
  
  
  async create(req: Request, res: Response) {
    const { name } = req.body;

    try {
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

    try {
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