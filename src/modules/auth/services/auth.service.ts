import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserBo } from 'modules/user/bos/user.bo';
import { UserEntity } from 'modules/user/entities/user.entity';
import { UserService } from 'modules/user/services/user.service';

import { HashService } from 'providers/hash/services/hash.service';

import { AuthSignInBo } from '../bos/auth.bo';
import { AuthToken } from '../entities/AuthToken';

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  private async generateAuthToken(user: UserEntity): Promise<AuthToken> {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    return {
      accessToken,
    };
  }

  async signIn({ email, password }: AuthSignInBo): Promise<AuthToken> {
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

    const authToken = await this.generateAuthToken(user);
    Object.assign(user, authToken);

    await this.usersService.save(user);

    return authToken;
  }

  async signUp(data: CreateUserBo): Promise<UserEntity> {
    return this.usersService.create(data);
  }

  async signOut(userId: string): Promise<void> {
    const user = await this.usersService.read({
      id: userId,
    });

    user.accessToken = null;

    await this.usersService.save(user);
  }
}
