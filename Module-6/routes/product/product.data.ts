import { Product } from '../../schema/Product';

export const getProducts = async () => {
  return await Product.find().populate('title', 'description', 'price').exec();
};

export const getProductById = async (id) => {
  return await Product.findOne({uuid: id}).populate('title', 'description', 'price').exec();
};
