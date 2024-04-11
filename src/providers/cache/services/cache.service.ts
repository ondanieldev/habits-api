export type CacheOptions = { expiresInSecs: number };

export class CacheService {
  get: <T extends object>(key: string) => Promise<T | null>;

  set: <T extends object>(
    key: string,
    data: T,
    options?: CacheOptions,
  ) => Promise<void>;

  unset: (key: string) => Promise<void>;

  unsetByPrefix: (prefix: string) => Promise<void>;
}
