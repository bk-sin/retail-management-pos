import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    example: 'Juan',
    maxLength: 100,
  })
  @Transform(({ value }: TransformFnParams) => String(value ?? '').trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @ApiProperty({
    example: 'Pérez',
    maxLength: 100,
  })
  @Transform(({ value }: TransformFnParams) => String(value ?? '').trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({
    example: 'juan.perez@email.com',
    maxLength: 254,
  })
  @Transform(({ value }: TransformFnParams) =>
    String(value ?? '')
      .trim()
      .toLowerCase(),
  )
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(254)
  email: string;

  @ApiProperty({
    example: 'password123',
    minLength: 8,
    description:
      'At least 8 characters; consider including letters and numbers.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
