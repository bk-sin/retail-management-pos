import { Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TaxesService, PrismaService],
  exports: [TaxesService],
})
export class TaxesModule {}
