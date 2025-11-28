import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@/common/prisma/prisma.service';
import { RoleGuard } from '@/common/guards/role.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, RoleGuard],
})
export class UsersModule {}
