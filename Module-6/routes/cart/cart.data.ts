import {carts, UpdateProductPayload} from "../../data/cart";
import {orders} from "../../data/order";
import { v4 as uuidv4 } from 'uuid';

const findCartByUserId = (id) => carts.find((cart) => cart.userId === id);
const findOrderByUserId = (id) => orders.find((cart) => cart.userId === id);
const getResponseFields = (cart) => ({
    id: cart.id,
    items: cart.items,
});

export const getCart = (userId) => {
    const userCart = findCartByUserId(userId);
    if (userCart) {
        return getResponseFields(userCart);
    } else {
        carts.push({
            id: uuidv4(),
            userId,
            isDeleted: false,
            items: [],
        });
        return findCartByUserId(userId);
    }
};

export const updateCart = (userId, product: UpdateProductPayload) => {
    const userCart = findCartByUserId(userId);
    const userProduct = userCart.items.find((item) => item.product.id === product.productId);
    if (userProduct) {
        userProduct.count = product.count;
    } else {
        userCart.items.push({
            product: {
                id: product.productId,
                title: '',
                description: 'new product ' + product.productId,
                price: 0
            },
            count: product.count
        });
    }
    return getResponseFields(userCart);
};

export const deleteCartItems = (userId) => {
    const userCart = findCartByUserId(userId);
    userCart.items = [];
    return "success";
};

export const createOrder = (userId) => {
    const userCart = findCartByUserId(userId);
    if (userCart.items.length > 0) {
        console.log('order: ', findOrderByUserId(userId));
        return findOrderByUserId(userId);
    } else {
        return false;
    }
};

