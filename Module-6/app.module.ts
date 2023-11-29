import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import {RouterModule} from "@nestjs/core";

import {AuthModule} from "./routes/auth";
import {CartModule} from "./routes/cart";
import {ProductModule} from "./routes/product";

import {verifyToken} from "./middleware/auth";

@Module({
  imports: [
    AuthModule,
    CartModule,
    ProductModule,
    RouterModule.register([
      {
        path: 'profile',
        module: CartModule,
      },
    ])
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(verifyToken)
      .forRoutes('api');
  }
}
