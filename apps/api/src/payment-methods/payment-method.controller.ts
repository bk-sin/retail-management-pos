import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { PaymentMethod } from '@bksin/database';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@ApiBearerAuth('jwt')
@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  async create(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodService.createPaymentMethod(
      createPaymentMethodDto,
    );
  }

  @Get()
  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodService.getAllPaymentMethods();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PaymentMethod | null> {
    return this.paymentMethodService.getPaymentMethodById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodService.updatePaymentMethod(
      updatePaymentMethodDto,
      +id,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<PaymentMethod> {
    return this.paymentMethodService.deletePaymentMethod(+id);
  }
}
