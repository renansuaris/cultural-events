import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Event } from '../entities/Event';

export class EventController {
  
  async create(req: Request, res: Response) {

    const { title, date, location, description, categoryId } = req.body;
    const userId = req.userId;

    if (!title || !date || !location || !userId || !categoryId) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    try {
      const eventRepository = AppDataSource.getRepository(Event);

      const newEvent = eventRepository.create({
        title,
        date, 
        location,
        description,
        categoryId, 
        userId      
      });

      await eventRepository.save(newEvent);

      return res.status(201).json(newEvent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar evento' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const eventRepository = AppDataSource.getRepository(Event);

      const events = await eventRepository.find({
        relations: ['category', 'user']
      });

      return res.json(events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, date, location, description, categoryId } = req.body;

    try {
      const eventRepository = AppDataSource.getRepository(Event);

      const event = await eventRepository.findOneBy({ id });

      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      event.title = title || event.title;
      event.date = date || event.date;
      event.location = location || event.location;
      event.description = description || event.description;
      event.categoryId = categoryId || event.categoryId;

      await eventRepository.save(event);

      return res.json(event);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar evento' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const eventRepository = AppDataSource.getRepository(Event);
      
      const event = await eventRepository.findOneBy({ id });

      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      await eventRepository.remove(event);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar evento' });
    }
  }
}