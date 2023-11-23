import {QueryOrder} from '@mikro-orm/core';
import { DI } from '../../index';

export const getProducts = async () => {
  return await DI.productRepository.findAll({
    populate: ['title', 'description', 'price'],
    orderBy: { title: QueryOrder.DESC },
    limit: 20,
  });
};

export const getProductById = async (id) => {
  return await DI.productRepository.find({uuid: id}, {
    populate: ['title', 'description', 'price']
  });
};
