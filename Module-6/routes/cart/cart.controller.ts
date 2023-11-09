import {Controller, Get, Put, Post, Delete, Headers, Body, Res, HttpStatus} from '@nestjs/common';
import { CartService } from './cart.service';
import {CartEntity, UpdateProductPayload} from "../../data/cart";
import {OrderEntity} from "../../data/order";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    getCart(@Headers() headers: Request): Partial<CartEntity> {
        return this.cartService.getCart(headers['x-user-id']);
    }
    @Put()
    updateCart(@Body() body: UpdateProductPayload, @Headers() headers: Request): Partial<CartEntity> {
        return this.cartService.updateCart(headers['x-user-id'], body);
    }
    @Delete()
    deleteCartItems(@Headers() headers: Request): string {
        return this.cartService.deleteCartItems(headers['x-user-id']);
    }
    @Post('/checkout')
    createOrder(@Res() res, @Headers() headers: Request): OrderEntity {
        const result = this.cartService.createOrder(headers['x-user-id']);
        return typeof result !== 'boolean' ? res.send(result) : res.status(HttpStatus.BAD_REQUEST).send('Bad request');
    }
}
