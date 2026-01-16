import { AppDataSource } from '../config/data-source';
import { Event } from '../entities/Event';
import { Category } from '../entities/Category';
import { ForbiddenError, NotFoundError } from '../errors/AppErrors';

export class EventService {
  private eventRepository = AppDataSource.getRepository(Event);
  private categoryRepository = AppDataSource.getRepository(Category);

  async create(data: any, userId: string) {
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

  async list(query: any) {
    const { categoryId, userId } = query; 
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 6;
    const skip = (page - 1) * limit;

    const whereCondition: any = {};
    if (categoryId) whereCondition.categoryId = categoryId;
    if (userId) whereCondition.userId = userId;

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

  async update(id: string, data: any, userId: string, userRole: string) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new NotFoundError('Evento não encontrado');
      
    if (event.userId !== userId && userRole !== 'admin') {
      throw new ForbiddenError('Você não tem permissão para editar este evento');
    }

    if (data.categoryId) {
        const categoryExists = await this.categoryRepository.findOneBy({ id: data.categoryId });
        if (!categoryExists) throw new NotFoundError('Categoria não encontrada');
    }

    Object.assign(event, data);
    
    await this.eventRepository.save(event);
    return event;
  }

  async delete(id: string, userId: string, userRole: string) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new NotFoundError('Evento não encontrado');
      
    if (event.userId !== userId && userRole !== 'admin') {
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