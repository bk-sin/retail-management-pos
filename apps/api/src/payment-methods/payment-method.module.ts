import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentMethodService } from './payment-method.service';

@Module({
  providers: [PaymentMethodService, PrismaService],
  exports: [PaymentMethodService],
  controllers: [PaymentMethodController],
})
export class PaymentMethodModule {}
