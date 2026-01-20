import { Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { Category } from '../entities/Category';
import { CategoryService } from '../services/CategoryService';
import { CategoryController } from '../controllers/CategoryController';
import { validate } from '../middlewares/validate';
import { authMiddleware } from '../middlewares/authMiddleware';
import { categorySchema } from '../schemas/category.schema';

const categoryRoutes = Router();

const categoryRepository = AppDataSource.getRepository(Category);
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

categoryRoutes.get('/', categoryController.list.bind(categoryController));
categoryRoutes.post('/', authMiddleware, validate(categorySchema), categoryController.create.bind(categoryController));
categoryRoutes.delete('/:id', authMiddleware, categoryController.delete.bind(categoryController));

export { categoryRoutes };