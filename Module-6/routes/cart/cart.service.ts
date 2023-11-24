import { Injectable } from '@nestjs/common';
import {getCart, updateCart, deleteCartItems, createOrder} from './cart.data';
import {CartEntity} from "../../data/cart";
import {OrderEntity} from "../../data/order";

@Injectable()
export class CartService {
    getCart(userId): Partial<CartEntity> {
        return getCart(userId);
    }
    updateCart(userId, cartItem): Partial<CartEntity> {
        return updateCart(userId, cartItem);
    }
    deleteCartItems(userId): string {
        return deleteCartItems(userId);
    }
    createOrder(userId): OrderEntity | boolean {
        return createOrder(userId);
    }
}
