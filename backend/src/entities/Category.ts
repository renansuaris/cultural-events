import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from './Event'; 

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) 
  name: string;
}