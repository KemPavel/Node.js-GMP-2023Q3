import {Controller, Get, Put, Post, Delete, Headers, Body, Res, HttpStatus} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    getCart(@Headers() headers: Request) {
        return this.cartService.getCart(headers['x-user-id']);
    }
    @Put()
    updateCart(@Body() body, @Headers() headers: Request) {
        return this.cartService.updateCart(headers['x-user-id'], body);
    }
    @Delete()
    deleteCartItems(@Headers() headers: Request) {
        return this.cartService.deleteCartItems(headers['x-user-id']);
    }
    @Post('/checkout')
    createOrder(@Res() res, @Headers() headers: Request) {
        const result = this.cartService.createOrder(headers['x-user-id']);
        return result ? res.send(result) : res.status(HttpStatus.BAD_REQUEST).send('Bad request');
    }
}
