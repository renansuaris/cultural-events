import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Event } from '../entities/Event';
import { User } from '../entities/User';

export class EventController {
  
  async create(req: Request, res: Response) {

    const { title, date, location, description, categoryId } = req.body;
    const userId = req.userId;

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

    const { categoryId, userId } = req.query; 
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;

    const skip = (page - 1) * limit;

    const whereCondition: any = {};
    
    if (categoryId) {
      whereCondition.categoryId = categoryId;
    }

    if (userId) {
      whereCondition.userId = userId;
    }

    const [events, total] = await eventRepository.findAndCount({
      where: whereCondition,
      relations: { category: true, user: true },
      select: {
        category: { id: true, name: true },
        user: { id: true, name: true },
      },
      order: { date: 'ASC' },
      take: limit,
      skip: skip,
    });

    return res.json({
      data: events,
      total,
      page,
      lastPage: Math.ceil(total / limit)
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar eventos' });
  }
}

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, date, location, description, categoryId } = req.body;
    const userId = req.userId;

    try {

      const eventRepository = AppDataSource.getRepository(Event);
      const userRepository = AppDataSource.getRepository(User); 

      const event = await eventRepository.findOneBy({ id });

      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      const requestUser = await userRepository.findOneBy({ id: userId });
      
      if (event.userId !== userId && requestUser?.role !== 'admin') {
        return res.status(403).json({ message: 'Voce não tem permissão pra editar esse evento!' });
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
    const userId = req.userId;

    try {
      const eventRepository = AppDataSource.getRepository(Event);
      const userRepository = AppDataSource.getRepository(User);

      const event = await eventRepository.findOneBy({ id });

      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      const requestUser = await userRepository.findOneBy({ id: userId });
      
      if (event.userId !== userId && requestUser?.role !== 'admin') {
        return res.status(403).json({ message: 'Voce não tem permissão para deletar este evento' });
      }

      await eventRepository.remove(event);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar evento' });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const eventRepository = AppDataSource.getRepository(Event);
      
      const event = await eventRepository.findOne({
        where: { id }, 
        relations: ['category', 'user'] 
      });

      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado' });
      }

      return res.json(event);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar evento' });
    }
  }

}