import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}
  async create(createBusinessDto: CreateBusinessDto) {
    const existing = await this.prisma.companyConfig.findFirst();
    if (existing) {
      throw new Error('Company configuration already exists');
    }
    return await this.prisma.companyConfig.create({
      data: {
        ...createBusinessDto,
      },
    });
  }

  findAll() {
    return this.prisma.companyConfig.findMany();
  }

  async update(id: number, updateBusinessDto: UpdateBusinessDto) {
    await this.prisma.companyConfig.update({
      where: { id },
      data: { ...updateBusinessDto },
    });
    return `This action updates a #${id} business`;
  }
}
