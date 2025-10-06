import { TaxType } from '@bksin/database';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTaxDto {
  @ApiProperty({
    example: 'VAT',
    description: 'Name of the tax',
  })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'Value Added Tax',
    description: 'Description of the tax',
  })
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiProperty({
    example: 0.21,
    description: 'Rate of the tax',
  })
  @IsNumber()
  @IsPositive()
  @Max(1)
  @Min(0)
  rate: number;

  @ApiProperty({
    example: 'PERCENTAGE',
    description: 'Type of the tax',
  })
  @IsString()
  type: TaxType;
  @ApiProperty({
    example: '2000',
    description: 'AFIP code of the tax',
  })
  @IsString()
  afipCode?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the tax is active',
  })
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates if the tax is the default tax',
  })
  @IsBoolean()
  isDefault?: boolean;
}
