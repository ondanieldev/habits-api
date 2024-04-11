import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'modules/user/services/user.service';

import { HashService } from 'providers/hash/services/hash.service';

import { AuthSignInBo } from '../bos/auth.bo';

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async signIn({
    email,
    password,
  }: AuthSignInBo): Promise<{ accessToken: string }> {
    const user = await this.usersService.read({
      email,
    });

    const isPasswordValid = await this.hashService.verify(
      password,
      user?.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: 'user.id', email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
