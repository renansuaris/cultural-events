import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Category } from './Category';

@Entity('events')
export class Event {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  date: string; 

  @Column()
  location: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, { onDelete: 'SET NULL' }) 
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({nullable: true})
  categoryId: string;

  @ManyToOne(() => User, (user) => user.events, {
     onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;
}