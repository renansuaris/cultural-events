import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { OneToMany } from 'typeorm';
import { Event } from './Event';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity('users') 
export class User {
  
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column()
  name: string;

  @Column({ unique: true }) 
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'simple-enum', 
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}