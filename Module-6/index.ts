import { NestFactory } from  '@nestjs/core';
import { AppModule } from  './app.module';
import 'reflect-metadata';
import dotenv from "dotenv";
import * as database from "./config/database";
import {NestExpressApplication} from "@nestjs/platform-express";
import {CurrentUser, verifyToken} from "./middleware/auth";

declare global {
  namespace Express {
    interface Request {
      user: CurrentUser
    }
  }
}

async  function  bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  dotenv.config();
  app.setGlobalPrefix('api');
  await database.connect();
  await app.listen(3000, () => console.log(`App started on PORT 3000`));
}

bootstrap();
