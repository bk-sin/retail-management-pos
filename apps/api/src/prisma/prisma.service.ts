import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@bksin/database';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const databaseUrl = process.env.DB_URL;
    if (!databaseUrl) {
      throw new Error('DB_URL is not defined in environment variables');
    }

    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
