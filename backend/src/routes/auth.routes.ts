import { Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { AuthService } from '../services/AuthService';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../middlewares/validate';
import { loginSchema } from '../schemas/login.schema';

const authRoutes = Router();

const userRepository = AppDataSource.getRepository(User);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRoutes.post('/login', validate(loginSchema), authController.login.bind(authController));

export { authRoutes };