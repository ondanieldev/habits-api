import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateUserBo } from 'modules/user/bos/user.bo';
import { UserTokenEntity } from 'modules/user/entities/user-token.entity';
import { UserEntity } from 'modules/user/entities/user.entity';
import { UserTokenService } from 'modules/user/services/user-token.service';
import { UserService } from 'modules/user/services/user.service';

import { HashService } from 'providers/hash/services/hash.service';

import { AuthSignInBo } from '../bos/auth.bo';

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private usersService: UserService,
    private userTokenService: UserTokenService,
  ) {}

  async signIn({
    email,
    password,
  }: AuthSignInBo): Promise<Pick<UserTokenEntity, 'token'>> {
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

    const { token } = await this.userTokenService.generate({
      strategy: 'jwt',
      type: 'auth',
      userId: user.id,
    });

    return {
      token,
    };
  }

  async signUp(data: CreateUserBo): Promise<UserEntity> {
    return this.usersService.create(data);
  }

  async signOut(userToken: UserTokenEntity): Promise<void> {
    await this.userTokenService.delete(userToken.id);
  }
}
