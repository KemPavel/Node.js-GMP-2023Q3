import { Schema, model } from 'mongoose';
import {ProductEntity, productSchema} from "./Product";

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export const cartItemsSchema = new Schema<CartItemEntity>({
  product: { type: productSchema, required: true },
  count: { type: Number, required: true },
});

export const CartItem = model<CartItemEntity>("CartItem", cartItemsSchema);

export interface CartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

const cartSchema = new Schema<CartEntity>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: false },
  items: { type: [cartItemsSchema], required: false },
});

export const Cart = model<CartEntity>("Cart", cartSchema);
