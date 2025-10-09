import { IvaCondition } from '@bksin/database';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty({
    example: 'My Company LLC',
    description: 'The legal name of the business',
  })
  @IsString()
  @MinLength(3)
  legalName: string;

  @ApiProperty({
    example: '20-12345678-9',
    description: 'The CUIT of the business',
  })
  @IsString()
  @Matches(/^\d{2}-\d{8}-\d{1}$/, {
    message: 'El formato debe ser XX-XXXXXXXX-X.',
  })
  cuit: string;

  @ApiProperty({
    example: IvaCondition.RESPONSABLE_INSCRIPTO,
    description: 'The IVA condition of the business',
  })
  @IsString()
  @Matches(new RegExp(`^(${Object.values(IvaCondition).join('|')})$`), {
    message: `Debe ser una de las siguientes condiciones: ${Object.values(
      IvaCondition,
    ).join(', ')}`,
  })
  ivaCondition: IvaCondition;

  @ApiProperty({ example: 'My Company', description: 'The display name' })
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiProperty({ example: '12345678', description: 'The phone number' })
  @IsString()
  @MinLength(8)
  phone: string;

  @ApiProperty({ example: '123 Main St', description: 'The address' })
  @IsString()
  address?: string;

  @ApiProperty({ example: 'Springfield', description: 'The city' })
  @IsString()
  city?: string;

  @ApiProperty({ example: 'State', description: 'The province' })
  @IsString()
  province?: string;

  @ApiProperty({ example: '12345', description: 'The postal code' })
  @IsString()
  postalCode?: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'https://example.com',
    description: 'The website URL',
  })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'The logo URL',
  })
  @IsString()
  @IsOptional()
  logoUrl?: string;

  @ApiProperty({ example: 'USD', description: 'The currency code' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: 'America/New_York', description: 'The timezone' })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiProperty({
    example: 'Thank you for your business!',
    description: 'The receipt footer',
  })
  @IsString()
  @IsOptional()
  receiptFooter?: string;

  @ApiProperty({ example: [1, 2], description: 'Array of selected tax IDs' })
  @IsArray()
  @IsNumber({}, { each: true })
  selectedTaxes: number[];

  @ApiProperty({
    example: [1, 2],
    description: 'Array of selected payment methods IDs',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  selectedPaymentMethods: number[];
}
