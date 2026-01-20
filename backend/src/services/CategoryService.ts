import { Repository } from 'typeorm/repository/Repository';
import { Category } from '../entities/Category';
import { ConflictError, ForbiddenError, NotFoundError } from '../errors/AppErrors';
import { UserRoles } from '../constants/roles';

export class CategoryService {
  constructor(private categoryRepository: Repository<Category>) {}

  async create(name: string, userId: string, userRole: UserRoles) {
    if (userRole !== UserRoles.ADMIN) {
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

  async delete(id: string, userId: string, userRole: UserRoles) {
    if (userRole !== UserRoles.ADMIN) {
      throw new ForbiddenError('Apenas administradores podem deletar categorias');
    }

    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundError('Categoria não encontrada');
    }

    await this.categoryRepository.remove(category);
  }
}