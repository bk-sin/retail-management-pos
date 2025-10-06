import { TaxSchema } from '@bksin/validators';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaxesService {
  constructor(private prisma: PrismaService) {}

  getAllTaxes() {
    return this.prisma.tax.findMany();
  }

  getTaxById(taxId: number) {
    return this.prisma.tax.findUnique({ where: { id: taxId } });
  }

  createTax(taxData: TaxSchema) {
    return this.prisma.tax.create({ data: taxData });
  }

  updateTax(taxData: TaxSchema, taxId: number) {
    return this.prisma.tax.update({
      where: { id: taxId },
      data: taxData,
    });
  }

  deleteTax(taxId: number) {
    return this.prisma.tax.delete({ where: { id: taxId } });
  }
}
