import { Router } from 'express';
import { userRoutes } from './user.routes';
import { eventRoutes } from './event.routes';
import { categoryRoutes } from './category.routes';
import { authRoutes } from './auth.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/events', eventRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/', authRoutes); 

export default routes;