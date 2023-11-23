import { DI } from '../../index';

export const getCart = async (userId) => {
  let cart = await DI.cartRepository.findOne({user: userId});

  if (!cart) {
    cart = await DI.cartRepository.create({});
  }

  return cart;
};

export const updateCart = async (userId, item) => {
  const cart = await DI.cartRepository.findOne({user: userId});
  const product = await DI.productRepository.findOne({ uuid: item.uuid });
  if (product) {
    product.count = item.count;
    await DI.productRepository.persistAndFlush(product);
  }
  return cart;
};

export const deleteCartItems = async (userId) => {
  const cart = await DI.cartRepository.findOne({user: userId});
  if (cart) {
    cart.items = null;
    cart.isDeleted = true;
    return "success";
  }

  return "failure";
};

export const createOrder = async (userId) => {
  const cart = await DI.cartRepository.findOne({user: userId});

  if (cart && cart.items.length > 0) {
    return await DI.orderRepository.create({});
  }
};

