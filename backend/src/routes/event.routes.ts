import { Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { Event } from '../entities/Event';
import { Category } from '../entities/Category';
import { EventService } from '../services/EventService';
import { EventController } from '../controllers/EventController';
import { validate } from '../middlewares/validate';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createEventSchema, updateEventSchema, listEventsSchema } from '../schemas/event.schema';

const eventRoutes = Router();

const eventRepository = AppDataSource.getRepository(Event);
const categoryRepository = AppDataSource.getRepository(Category);

const eventService = new EventService(eventRepository, categoryRepository);
const eventController = new EventController(eventService);

eventRoutes.post('/', authMiddleware, validate(createEventSchema), eventController.create.bind(eventController));
eventRoutes.get('/', validate(listEventsSchema), eventController.list.bind(eventController));
eventRoutes.get('/:id', eventController.show.bind(eventController));
eventRoutes.put('/:id', authMiddleware, validate(updateEventSchema), eventController.update.bind(eventController));
eventRoutes.delete('/:id', authMiddleware, eventController.delete.bind(eventController));

export { eventRoutes };