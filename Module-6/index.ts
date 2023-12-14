import { NestFactory } from  '@nestjs/core';
import { AppModule } from  './app.module';
import 'reflect-metadata';
import { connect } from 'mongoose';
import {NestExpressApplication} from "@nestjs/platform-express";


async  function  bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  const connection = await connect('mongodb://127.0.0.1:27017');
  if (connection) {
    console.log("connection: ", connection);
    console.log("\x1b[32m%s\x1b[0m", "Database Connected Successfully...");
  }

  await app.listen(3000, () => console.log(`App started on PORT 3000`));
}

bootstrap();
