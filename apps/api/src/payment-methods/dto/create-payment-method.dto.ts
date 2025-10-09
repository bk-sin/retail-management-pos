import { PaymentFeeType, PaymentMethodType } from '@bksin/database';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty({
    example: 'Mercado Pago',
    description: 'Name of the payment method',
  })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'Payment method for online transactions',
    description: 'Description of the payment method',
  })
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiProperty({
    example: 'PERCENTAGE',
    description: 'Type of the payment method',
  })
  @IsString()
  type: PaymentMethodType;

  @ApiProperty({
    example: true,
    description: 'Indicates if the payment method is active',
  })
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: false,
    description:
      'Indicates if the payment method is the default payment method',
  })
  @IsBoolean()
  isDefault?: boolean;

  @ApiProperty({
    example: 2.5,
    description: 'Fee percentage for using this payment method',
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  processingFee?: number;

  @ApiProperty({
    example: 'PERCENTAGE',
    description: 'Type of the fee',
  })
  @IsString()
  feeType: PaymentFeeType;
}
