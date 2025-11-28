import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit {
  private readonly prisma: PrismaClient;
  user: any;

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });

    this.prisma = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    await this.prisma.$connect();
    console.log('✅ Database is connected 🚀');
  }

  get client() {
    return this.prisma;
  }
}
