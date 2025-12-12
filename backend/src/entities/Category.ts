import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) 
  name: string;
}