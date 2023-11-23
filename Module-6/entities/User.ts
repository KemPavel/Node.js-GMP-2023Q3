import {Entity, OneToOne, OneToMany, PrimaryKey, Ref, Collection} from "@mikro-orm/core";
import { v4 as uuidv4 } from 'uuid';
import {Cart} from "./cart";
import {Order} from "./Order";

@Entity()
export class User {
  @PrimaryKey()
  uuid: string = uuidv4();

  @OneToOne(() => Cart, { nullable: true })
  cart!: Cart;

  @OneToMany(() => Order, order => order.user)
  orders: Collection<Order> = new Collection<Order>(this);

  constructor() {}
}
