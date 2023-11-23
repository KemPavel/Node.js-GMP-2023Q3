import { Injectable } from '@nestjs/common';
import {getCart, updateCart, deleteCartItems, createOrder} from './cart.data';

@Injectable()
export class CartService {
  getCart(userId) {
    return getCart(userId);
  }
  updateCart(userId, cartItem) {
    return updateCart(userId, cartItem);
  }
  deleteCartItems(userId) {
    return deleteCartItems(userId);
  }
  createOrder(userId) {
    return createOrder(userId);
  }
}
