import { AppDataSource } from '../config/data-source';
import { Category } from '../entities/Category';
import { User } from '../entities/User';
import { AppError } from '../errors/AppErrors';

export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category);
  private userRepository = AppDataSource.getRepository(User);

  async create(name: string, userId: string) {
    const requester = await this.userRepository.findOneBy({ id: userId });

    if (requester?.role !== 'admin') {
      throw new AppError('Apenas administradores podem criar categorias', 403);
    }

    const categoryExists = await this.categoryRepository.findOneBy({ name });
    if (categoryExists) {
      throw new AppError('Categoria já existe', 409);
    }

    const newCategory = this.categoryRepository.create({ name });
    await this.categoryRepository.save(newCategory);

    return newCategory;
  }

  async list() {
    return await this.categoryRepository.find();
  }

  async delete(id: string, userId: string) {
    const requester = await this.userRepository.findOneBy({ id: userId });

    if (requester?.role !== 'admin') {
      throw new AppError('Apenas administradores podem deletar categorias', 403);
    }

    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new AppError('Categoria não encontrada', 404);
    }

    await this.categoryRepository.remove(category);
  }
}