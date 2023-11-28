import { Schema, model } from 'mongoose';
import {cartItemsSchema, CartItemEntity} from "./Cart";

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity {
  id: string,
  userId: string;
  cartId: string;
  items: CartItemEntity[];
  payment: {
    type: string,
    address?: string,
    creditCard?: string,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

const OrderSchema = new Schema<OrderEntity>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: [cartItemsSchema], required: false },
  payment: {
    type: String,
    address: String,
    creditCard: String,
  },
  delivery: {
    type: String,
    address: String,
  },
  comments: String,
  status: String,
  total: Number
});

export const Order = model<OrderEntity>("Order", OrderSchema);
