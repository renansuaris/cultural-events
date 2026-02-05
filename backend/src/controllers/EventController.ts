import { Request, Response } from 'express';
import { EventService } from '../services/EventService';

export class EventController {

  constructor(private eventService: EventService) {}
  
  async create(req: Request, res: Response) {
    const { userId } = req;
    const newEvent = await this.eventService.create(req.body, userId);
    return res.status(201).json(newEvent);
  }

  async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const categoryId = req.query.categoryId as string | undefined;
    const userId = req.query.userId as string | undefined;
    const title = req.query.title as string | undefined;

    const result = await this.eventService.list({
      page,
      limit,
      categoryId,
      userId,
      title
    });

    return res.json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;
    const event = await this.eventService.update(id, req.body, userId, req.userRole);
    return res.json(event);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, userRole } = req;
    await this.eventService.delete(id, userId, userRole);
    return res.status(204).send();
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const event = await this.eventService.show(id);
    return res.json(event);
  }
}