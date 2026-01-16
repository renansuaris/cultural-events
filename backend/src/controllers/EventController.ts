import { Request, Response } from 'express';
import { EventService } from '../services/EventService';

export class EventController {
  
  async create(req: Request, res: Response) {
    const { title, date, location, description, categoryId } = req.body;
    const userId = req.userId;

    const eventService = new EventService();
    const newEvent = await eventService.create(
      { title, date, location, description, categoryId }, 
      userId
    );

    return res.status(201).json(newEvent);
  }

  async list(req: Request, res: Response) {
    const eventService = new EventService();
    const result = await eventService.list(req.query);
    return res.json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;
    const { title, date, location, description, categoryId } = req.body;

    const eventService = new EventService();
    const event = await eventService.update(id, { title, date, location, description, categoryId }, userId);

    return res.json(event);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    const eventService = new EventService();
    await eventService.delete(id, userId);

    return res.status(204).send();
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const eventService = new EventService();
    const event = await eventService.show(id);
    return res.json(event);
  }
}