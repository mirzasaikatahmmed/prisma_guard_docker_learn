import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@ApiTags('users')
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const prismaClient = this.prisma.client;
      const user = await prismaClient.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error: any) {
      console.error('UsersService.create error:', error);
      if (error?.code === 'P2002') {
        throw new ConflictException('A user with this email already exists.');
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const prismaClient = this.prisma.client;
      return await prismaClient.user.findMany();
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error?.message ?? error}`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  
}
