import { Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';
import { validate } from '../middlewares/validate';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createUserSchema, updateUserSchema, updateRoleSchema } from '../schemas/user.schema';

const userRoutes = Router();

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.post('/', validate(createUserSchema), userController.create.bind(userController));
userRoutes.get('/me', authMiddleware, userController.me.bind(userController));
userRoutes.get('/', authMiddleware, userController.index.bind(userController));
userRoutes.put('/:id', authMiddleware, validate(updateUserSchema), userController.update.bind(userController));
userRoutes.patch('/:id/role', authMiddleware, validate(updateRoleSchema), userController.updateRole.bind(userController));
userRoutes.delete('/:id', authMiddleware, userController.delete.bind(userController));

export { userRoutes };