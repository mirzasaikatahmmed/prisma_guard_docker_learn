import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService
  ) {}


  async register(dto: CreateUserDto) {
    if (!dto.email || !dto.password || !dto.name) {
      throw new BadRequestException('Name, email and password are required');
    }
    const prismaClient = this.prisma.client;
    const existingUser = await prismaClient.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = await prismaClient.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.client.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const secret = process.env.JWT_SECRET || 'change_this_secret';
    const token = jwt.sign({ sub: user.id, email: user.email }, secret, {
      expiresIn: '1h',
    });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}