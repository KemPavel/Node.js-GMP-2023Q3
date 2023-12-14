import { v4 as uuidv4 } from "uuid";
import { Cart } from '../../schema/Cart';
import { Order } from "../../schema/Order";
export const getCart = async (userId) => {
  let cart = await Cart.findOne({userId});

  if (!cart) {
    const newCart = new Cart({
      id: uuidv4(),
      userId,
      isDeleted: false,
      items: []
    });
    cart = await newCart.save();
  }

  return cart;
};

export const updateCart = async (userId, item) => {
  const updateVal = {
    count: item.count,
  };
  return await Cart.findOneAndUpdate({ userId }, {$set: { "items.$": updateVal }}).exec();
};

export const deleteCartItems = async (userId) => {
  return await Cart.findOneAndUpdate({userId}, { items: [], isDeleted: true }, { new: true }).exec();
};

export const createOrder = async (userId) => {
  const cart = await Cart.findOne({userId});

  if (cart && cart.items.length > 0) {
    const newOrder = new Order({
      id: uuidv4(),
      userId,
      cartId: cart.id,
      items: cart.items
    });
    return await newOrder.save();
  }
};

