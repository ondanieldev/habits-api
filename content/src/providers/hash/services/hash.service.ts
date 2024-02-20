export class HashService {
  public hashify: (plain: string) => Promise<string>;

  public verify: (plain: string, hash: string) => Promise<boolean>;
}
