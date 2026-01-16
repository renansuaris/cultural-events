import { AppDataSource } from '../config/data-source';
import { Event } from '../entities/Event';
import { User } from '../entities/User';
import { Category } from '../entities/Category';
import { AppError } from '../errors/AppErrors';

export class EventService {
  private eventRepository = AppDataSource.getRepository(Event);
  private userRepository = AppDataSource.getRepository(User);
  private categoryRepository = AppDataSource.getRepository(Category);

  async create(data: any, userId: string) {
    const categoryExists = await this.categoryRepository.findOneBy({ id: data.categoryId });
    if (!categoryExists) {
        throw new AppError('Categoria não encontrada', 404);
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

  async update(id: string, data: any, userId: string) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new AppError('Evento não encontrado', 404);

    const requestUser = await this.userRepository.findOneBy({ id: userId });
      
    if (event.userId !== userId && requestUser?.role !== 'admin') {
      throw new AppError('Você não tem permissão para editar este evento', 403);
    }

    if (data.categoryId) {
        const categoryExists = await this.categoryRepository.findOneBy({ id: data.categoryId });
        if (!categoryExists) throw new AppError('Categoria não encontrada', 404);
    }

    Object.assign(event, data);
    
    await this.eventRepository.save(event);
    return event;
  }

  async delete(id: string, userId: string) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new AppError('Evento não encontrado', 404);

    const requestUser = await this.userRepository.findOneBy({ id: userId });
      
    if (event.userId !== userId && requestUser?.role !== 'admin') {
      throw new AppError('Você não tem permissão para deletar este evento', 403);
    }

    await this.eventRepository.remove(event);
  }

  async show(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id }, 
      relations: ['category', 'user'] 
    });

    if (!event) throw new AppError('Evento não encontrado', 404);
    return event;
  }
}