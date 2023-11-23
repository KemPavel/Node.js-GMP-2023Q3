import {Entity, ManyToOne, PrimaryKey, Ref} from "@mikro-orm/core";
import { v4 as uuidv4 } from 'uuid';
import {User} from "./User";

@Entity()
export class Order {
  @PrimaryKey()
  uuid: string = uuidv4();

  @ManyToOne(() => User)
  user!: User;

  constructor() {}
}
