export class HashFakeService {
  public async hashify(plain: string): Promise<string> {
    return plain + '_hashed';
  }

  public async verify(plain: string, hash: string): Promise<boolean> {
    return plain + '_hashed' === hash;
  }
}
