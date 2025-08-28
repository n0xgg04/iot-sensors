import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OnlineService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getOnlineData() {
    return this.cacheManager.get('online');
  }

  async setOnlineData() {
    return this.cacheManager.set('online', 1, 4000);
  }
}
