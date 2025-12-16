import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { CategoryController } from './controllers/CategoryController';
import { EventController } from './controllers/EventController';
import { AuthController } from './controllers/AuthController';
import { authMiddleware } from './middlewares/authMiddleware';
import { validate } from './middlewares/validate';
import { createEventSchema, updateEventSchema } from './schemas/event.schema';
import { createUserSchema, updateUserSchema } from './schemas/user.schema';
import { categorySchema } from './schemas/category.schema';
import { loginSchema } from './schemas/login.schema';

const routes = Router();

const userController = new UserController();
const categoryController = new CategoryController();
const eventController = new EventController();
const authController = new AuthController();

routes.post('/login', validate(loginSchema), authController.login);
routes.get('/events', eventController.list);
routes.get('/categories', categoryController.list);

routes.post('/categories', authMiddleware, validate(categorySchema), categoryController.create);
routes.delete('/categories/:id', authMiddleware, categoryController.delete);

routes.post('/events', authMiddleware, validate(createEventSchema), eventController.create);
routes.put('/events/:id', authMiddleware, validate(updateEventSchema), eventController.update);
routes.delete('/events/:id', authMiddleware, eventController.delete);

routes.post('/users', validate(createUserSchema), userController.create);
routes.get('/users/me', authMiddleware, userController.me);
routes.put('/users/:id', authMiddleware, validate(updateUserSchema), userController.update);
routes.delete('/users/:id', authMiddleware, userController.delete);

export default routes;