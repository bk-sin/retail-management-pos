import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tax } from '@bksin/database';

@Injectable()
export class TaxesService {
  constructor(private prisma: PrismaService) {}

  async getAllTaxes(): Promise<Tax[]> {
    return this.prisma.tax.findMany();
  }

  async getTaxById(taxId: number): Promise<Tax | null> {
    return this.prisma.tax.findUnique({ where: { id: taxId } });
  }
  /* 
  async createTax(taxData: TaxSchema): Promise<Tax> {
    return this.prisma.tax.create({ data: taxData });
  }

  async updateTax(taxData: TaxSchema, taxId: number): Promise<Tax> {
    return this.prisma.tax.update({
      where: { id: taxId },
      data: taxData,
    });
  } */

  async deleteTax(taxId: number): Promise<Tax> {
    return this.prisma.tax.delete({ where: { id: taxId } });
  }
}
