import { NestFactory } from  '@nestjs/core';
import morgan from 'morgan';
import { AppModule } from  './app.module';
import 'reflect-metadata';
import dotenv from "dotenv";
import * as database from "./config/database";
import {NestExpressApplication} from "@nestjs/platform-express";
import {CurrentUser} from "./middleware/auth";
import {Logger} from "@nestjs/common";

declare global {
  namespace Express {
    interface Request {
      user: CurrentUser
    }
  }
}

dotenv.config();
const PORT = process.env.PORT;

async  function  bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }));

  const logger = new Logger('Shutdown');
  let connections = [];

  app.enableShutdownHooks();

  app.use((req, res, next) => {
    connections.push(req.connection);

    res.on('finish', () => {
      connections = connections.filter((curr) => curr !== req.connection);
    });

    next();
  });

  function handleShutdown(signal) {
    logger.log(`Received ${ signal } signal. Shutting down gracefully.`);

    // @ts-ignore
    app.close(() => {
      logger.log('Http server closed.');
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down.');
      process.exit(1);
    }, 20000);

    connections.forEach((connection) => connection.end());

    setTimeout(() => {
      connections.forEach((connection) => connection.destroy());
    }, 10000);
  }

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));


  await database.connect();
  await app.listen(PORT, () => console.log(`App started on PORT ${PORT}`));
}

bootstrap();
