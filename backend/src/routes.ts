import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { CategoryController } from './controllers/CategoryController';
import { EventController } from './controllers/EventController';

const routes = Router();

const userController = new UserController();
const categoryController = new CategoryController();
const eventController = new EventController();

routes.post('/users', userController.create);

routes.post('/categories', categoryController.create);
routes.get('/categories', categoryController.list);
routes.delete('/categories/:id', categoryController.delete);

routes.post('/events', eventController.create);
routes.get('/events', eventController.list);
routes.put('/events/:id', eventController.update);
routes.delete('/events/:id', eventController.delete);

export default routes;