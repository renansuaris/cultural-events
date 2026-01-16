import { AppDataSource } from '../config/data-source';
import { Category } from '../entities/Category';
import { ConflictError, ForbiddenError, NotFoundError } from '../errors/AppErrors';

export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category);

  async create(name: string, userId: string, userRole: string) {
    if (userRole !== 'admin') {
      throw new ForbiddenError('Apenas administradores podem criar categorias');
    }

    const categoryExists = await this.categoryRepository.findOneBy({ name });
    if (categoryExists) {
      throw new ConflictError('Categoria já existe');
    }

    const newCategory = this.categoryRepository.create({ name });
    await this.categoryRepository.save(newCategory);

    return newCategory;
  }

  async list() {
    return await this.categoryRepository.find();
  }

  async delete(id: string, userId: string, userRole: string) {
    if (userRole !== 'admin') {
      throw new ForbiddenError('Apenas administradores podem deletar categorias');
    }

    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundError('Categoria não encontrada');
    }

    await this.categoryRepository.remove(category);
  }
}