export class JwtFakeService {
  public async signAsync(payload: object): Promise<string> {
    return JSON.stringify(payload) + '_fake_token';
  }

  public async verifyAsync(token: string): Promise<object> {
    return JSON.parse(token.replace('_fake_token', ''));
  }
}
