import {Entity, ManyToOne, PrimaryKey, Ref, Property} from "@mikro-orm/core";
import { v4 as uuidv4 } from 'uuid';
import {Cart} from "./Cart";

@Entity()
export class Product {
  @PrimaryKey()
  uuid: string = uuidv4();

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: string;

  @Property()
  count!: number;

  @ManyToOne(() => Cart)
  cart!: Cart;

  constructor(title: string, description: string, price: string) {
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
