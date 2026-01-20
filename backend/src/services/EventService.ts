import { z } from 'zod';
import { Event } from '../entities/Event';
import { Category } from '../entities/Category';
import { ForbiddenError, NotFoundError } from '../errors/AppErrors';
import { createEventSchema, updateEventSchema, eventQuerySchema } from '../schemas/event.schema';
import { Repository } from 'typeorm/repository/Repository';
import { UserRoles } from '../constants/roles';
import { ILike } from 'typeorm';

type CreateEventDTO = z.infer<typeof createEventSchema>['body'];
type UpdateEventDTO = z.infer<typeof updateEventSchema>['body'];
type EventQueryDTO = z.infer<typeof eventQuerySchema>;

export class EventService {
  
  constructor(
    private eventRepository: Repository<Event>,
    private categoryRepository: Repository<Category>
  ) {}

  async create(data: CreateEventDTO, userId: string) {
    const categoryExists = await this.categoryRepository.findOneBy({ id: data.categoryId });
    if (!categoryExists) {
        throw new NotFoundError('Categoria não encontrada');
    }

    const newEvent = this.eventRepository.create({
      ...data,
      userId      
    });

    await this.eventRepository.save(newEvent);
    return newEvent;
  }

  async list(query: EventQueryDTO) {
    const { categoryId, userId, title } = query; 
    
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 6;
    
    const skip = (page - 1) * limit;

    const whereCondition: any = {};
    if (categoryId) whereCondition.categoryId = categoryId;
    if (userId) whereCondition.userId = userId;
    
    if (title) {
      whereCondition.title = ILike(`%${title}%`);
    }

    const [events, total] = await this.eventRepository.findAndCount({
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

    return {
      data: events,
      total,
      page,
      lastPage: Math.ceil(total / limit)
    };
  }

  async update(id: string, data: UpdateEventDTO, userId: string, userRole: UserRoles) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new NotFoundError('Evento não encontrado');
      
    if (event.userId !== userId && userRole !== UserRoles.ADMIN) {
      throw new ForbiddenError('Você não tem permissão para editar este evento');
    }

    if (data.categoryId) {
        const categoryExists = await this.categoryRepository.findOneBy({ id: data.categoryId });
        if (!categoryExists) throw new NotFoundError('Categoria não encontrada');
    }

    event.title = data.title ?? event.title;
    event.date = data.date ?? event.date;
    event.location = data.location ?? event.location;
    event.description = data.description ?? event.description;
    event.categoryId = data.categoryId ?? event.categoryId;
    
    await this.eventRepository.save(event);
    return event;
  }

  async delete(id: string, userId: string, userRole: UserRoles) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new NotFoundError('Evento não encontrado');
      
    if (event.userId !== userId && userRole !== UserRoles.ADMIN) { 
      throw new ForbiddenError('Você não tem permissão para deletar este evento');
    }

    await this.eventRepository.remove(event);
  }

  async show(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id }, 
      relations: ['category', 'user'] 
    });

    if (!event) throw new NotFoundError('Evento não encontrado');
    return event;
  }
}