import { NestFactory } from  '@nestjs/core';
import { AppModule } from  './app.module';
import {users} from "./data/user";
import http from 'http';
import * as dotenv from 'dotenv';
import config from './config/orm.config'
import 'reflect-metadata';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';

import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import {User} from "./entities/User";
import {Cart} from "./entities/Cart";
import {Product} from "./entities/Product";
import {Order} from "./entities/Order";
import {NestExpressApplication} from "@nestjs/platform-express";

dotenv.config();

const isUserExists = (id: string): boolean => !!users.find((user) => user.id === id);

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<User>,
  cartRepository: EntityRepository<Cart>,
  productRepository: EntityRepository<Product>,
  orderRepository: EntityRepository<Order>,
};

async  function  bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

  DI.em = DI.orm.em;
  // const testProduct = new Product('new book', 'description for new book', '10');
  // DI.em.create('Product', { title: 'new book', description: 'description for new book', price: '10' });

  // await DI.em.persistAndFlush(testProduct);

  DI.userRepository = DI.orm.em.getRepository(User);
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.orderRepository = DI.orm.em.getRepository(Order);
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

  app.setGlobalPrefix('api');
  app.use((req, res, next) => {
    if (isUserExists(req.headers['x-user-id'])) {
      next();
    } else {
      res.status(401).json({
        data: null,
        error: {
          message: "User is not authorized"
        }
      });
    }
  });

  DI.server = await app.listen(3000, () => {
    console.log('MikroORM example started at http://localhost:3000');
  });
}

bootstrap();
