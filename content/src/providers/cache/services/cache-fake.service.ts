import { CacheService } from './cache.service';

export class CacheFakeService implements CacheService {
  private dict: Record<string, any> = {};

  public async get<T extends object>(key: string): Promise<T | null> {
    return (this.dict[key] as T) || null;
  }

  public async set<T extends object>(key: string, data: T): Promise<void> {
    this.dict[key] = data;
  }

  public async unset(key: string): Promise<void> {
    delete this.dict[key];
  }

  public async unsetByPrefix(prefix: string): Promise<void> {
    Object.keys(this.dict).forEach((key) => {
      if (key.startsWith(prefix)) {
        delete this.dict[key];
      }
    });
  }
}
