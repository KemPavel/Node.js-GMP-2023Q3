import { Module } from '@nestjs/common';
import {RouterModule} from "@nestjs/core";

import {AuthModule} from "./routes/auth";
import {CartModule} from "./routes/cart";
import {ProductModule} from "./routes/product";

@Module({
  imports: [
    // AuthModule,
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
export class AppModule {}
