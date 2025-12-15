import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { CategoryController } from './controllers/CategoryController';
import { EventController } from './controllers/EventController';
import { AuthController } from './controllers/AuthController';
import { authMiddleware } from './middlewares/authMiddleware';

const routes = Router();

const userController = new UserController();
const categoryController = new CategoryController();
const eventController = new EventController();
const authController = new AuthController();

routes.post('/login', authController.login);
routes.post('/users', userController.create);
routes.get('/events', eventController.list);
routes.get('/categories', categoryController.list);

routes.post('/categories', authMiddleware, categoryController.create);
routes.delete('/categories/:id', authMiddleware, categoryController.delete);

routes.post('/events', authMiddleware, eventController.create);
routes.put('/events/:id', authMiddleware, eventController.update);
routes.delete('/events/:id', authMiddleware, eventController.delete);

export default routes;