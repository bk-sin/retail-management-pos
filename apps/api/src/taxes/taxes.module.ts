import { Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaxesController } from './taxes.controller';

@Module({
  providers: [TaxesService, PrismaService],
  exports: [TaxesService],
  controllers: [TaxesController],
})
export class TaxesModule {}
