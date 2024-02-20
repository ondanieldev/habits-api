import * as argon2 from 'argon2';

import { HashService } from './hash.service';

export class HashArgon2Service implements HashService {
  public async hashify(plain: string): Promise<string> {
    return argon2.hash(plain);
  }

  public async verify(plain: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
}
