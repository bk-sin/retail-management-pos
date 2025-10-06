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
import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from '@bksin/database';

@ApiBearerAuth('jwt')
@Controller('taxes')
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) {}

  @Post()
  async create(@Body() createTaxDto: CreateTaxDto): Promise<Tax> {
    return this.taxesService.createTax(createTaxDto);
  }

  @Get()
  async findAll(): Promise<Tax[]> {
    return this.taxesService.getAllTaxes();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tax | null> {
    return this.taxesService.getTaxById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTaxDto: UpdateTaxDto,
  ): Promise<Tax> {
    return this.taxesService.updateTax(updateTaxDto, +id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Tax> {
    return this.taxesService.deleteTax(+id);
  }
}
