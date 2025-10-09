import { PaymentMethod } from '@bksin/database';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(private prisma: PrismaService) {}

  async getAllPaymentMethods(): Promise<PaymentMethod[]> {
    return this.prisma.paymentMethod.findMany();
  }

  async getPaymentMethodById(
    paymentMethodId: number,
  ): Promise<PaymentMethod | null> {
    return this.prisma.paymentMethod.findUnique({
      where: { id: paymentMethodId },
    });
  }

  async createPaymentMethod(
    paymentMethodData: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.create({ data: paymentMethodData });
  }

  async updatePaymentMethod(
    paymentMethodData: UpdatePaymentMethodDto,
    paymentMethodId: number,
  ): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.update({
      where: { id: paymentMethodId },
      data: paymentMethodData,
    });
  }

  async deletePaymentMethod(paymentMethodId: number): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.delete({ where: { id: paymentMethodId } });
  }
}
