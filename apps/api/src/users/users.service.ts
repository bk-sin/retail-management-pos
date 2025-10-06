import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@bksin/database';

export type UserResponse = Prisma.UserGetPayload<{
  omit: { password: true };
}>;

export type UserResponseWithPassword = Prisma.UserGetPayload<object>;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: hashedPassword,
      },
    });
  }

  async findOne(id: string): Promise<UserResponse | null> {
    const user = this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
    return user;
  }

  async findOneByEmail(
    email: string,
  ): Promise<UserResponseWithPassword | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    console.log(user);
    return user;
  }

  /*   async findAll(): Promise<UserResponse[]> {
    return this.prisma.user.findMany({
      include: userInclude,
      omit: { password: true },
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  

  

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        firstName: updateUserDto?.firstName,
        lastName: updateUserDto?.lastName,
        phone: updateUserDto?.phone,
      },
      include: userInclude,
      omit: { password: true },
    });
  }

  async remove(id: number): Promise<boolean> {
    const userToDelete = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (isSuperAdmin(userToDelete)) {
      throw new ForbiddenException(
        'Cannot delete superadmin user for security reasons',
      );
    }

    await this.prisma.user.delete({
      where: { id },
    });
    return true;
  } */
}
