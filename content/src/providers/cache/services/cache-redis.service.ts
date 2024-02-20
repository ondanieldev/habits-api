import IORedis from 'ioredis';

import { redisConfig } from 'providers/redis/constants/redis.constant';

import { CacheOptions, CacheService } from './cache.service';

export class CacheRedisService implements CacheService {
  private ioredis: IORedis;

  constructor() {
    this.ioredis = new IORedis({
      host: redisConfig.host,
      port: redisConfig.port ? Number(redisConfig.port) : undefined,
      password: redisConfig.password,
    });
  }

  public async get<T extends object>(key: string): Promise<T | null> {
    const data = await this.ioredis.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  public async set<T extends object>(
    key: string,
    data: T,
    options?: CacheOptions | undefined,
  ): Promise<void> {
    await this.ioredis.set(key, JSON.stringify(data));
    if (options?.expiresInSecs) {
      await this.ioredis.expire(key, options.expiresInSecs);
    }
  }

  public async unset(key: string): Promise<void> {
    await this.ioredis.del(key);
  }

  public async unsetByPrefix(prefix: string): Promise<void> {
    const keys = await this.ioredis.keys(`${prefix}:*`);
    const pipeline = this.ioredis.pipeline();
    keys.forEach((key) => {
      pipeline.del(key);
    });
    await pipeline.exec();
  }
}
