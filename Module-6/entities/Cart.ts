import {Entity, Ref, OneToOne, PrimaryKey, Property, OneToMany, Collection} from "@mikro-orm/core";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user";
import {Product} from "./product";

@Entity()
export class Cart {
  @PrimaryKey()
  uuid: string = uuidv4();

  @Property()
  isDeleted!: boolean;

  @OneToMany(() => Product, product => product.cart, { nullable: true })
  items: Collection<Product> = new Collection<Product>(this);

  @OneToOne(() => User)
  user!: User;

  constructor(isDeleted: boolean) {
    this.isDeleted = isDeleted;
  }
}
