import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Event } from '../entities/Event';
import { Category } from '../entities/Category';
import dotenv from 'dotenv';

dotenv.config(); 

export const AppDataSource = new DataSource({
  type: 'postgres', 
  url: process.env.DATABASE_URL, 
  synchronize: true, 
  logging: false, 
  entities: [User, Event, Category], 
  migrations: [],
  subscribers: [],
  ssl: { rejectUnauthorized: false } 
});