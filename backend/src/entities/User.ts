import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OneToMany } from "typeorm";
import { Event } from "./Event";
import { UserRoles } from "../constants/roles";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: "text",
    default: UserRoles.USER,
  })
  role: UserRoles;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}