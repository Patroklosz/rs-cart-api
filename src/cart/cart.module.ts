import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { DatabaseService } from 'src/shared/services/database';

@Module({
  imports: [OrderModule],
  providers: [CartService, DatabaseService],
  controllers: [CartController],
})
export class CartModule {}
