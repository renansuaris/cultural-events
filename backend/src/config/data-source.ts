import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Event } from '../entities/Event';
import { Category } from '../entities/Category';

export const AppDataSource = new DataSource({
  type: 'sqlite', 
  database: 'database.sqlite', 
  synchronize: true, 
  logging: true, 
  entities: [User, Event, Category], 
  migrations: [],
  subscribers: [],
});