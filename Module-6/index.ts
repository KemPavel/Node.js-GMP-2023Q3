import { NestFactory } from  '@nestjs/core';
import { AppModule } from  './app.module';
import {users} from "./data/user";
import 'reflect-metadata';
import { connect } from 'mongoose';
import { User } from './schema/User';
import {NestExpressApplication} from "@nestjs/platform-express";

const isUserExists = (id: string): boolean => !!users.find((user) => user.id === id);

async  function  bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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

  const connection = await connect('mongodb://127.0.0.1:27017');
  if (connection) {
    console.log("connection: ", connection);
    console.log("\x1b[32m%s\x1b[0m", "Database Connected Successfully...");
  }

  await app.listen(3000, () => console.log(`App started on PORT 3000`));
}

bootstrap();
