import { NestFactory } from  '@nestjs/core';
import { AppModule } from  './app.module';
import {users} from "./data/user";

const isUserExists = (id: string): boolean => !!users.find((user) => user.id === id);

async  function  bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3000, () => console.log(`App started on PORT 3000`));
}

bootstrap();
