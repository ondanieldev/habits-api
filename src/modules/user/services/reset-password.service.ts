import { Injectable } from '@nestjs/common';

import { EmailService } from 'providers/email/services/email.service';
import { HashService } from 'providers/hash/services/hash.service';

import {
  GenerateResetPasswordTokenBo,
  ResetPasswordBo,
  ValidateResetPasswordTokenBo,
} from '../bos/reset-password.bo';
import { UserTokenEntity } from '../entities/user-token.entity';
import { UserEntity } from '../entities/user.entity';
import { UserTokenService } from './user-token.service';
import { UserService } from './user.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly emailService: EmailService,
    private readonly hashService: HashService,
    private readonly userService: UserService,
    private readonly userTokenService: UserTokenService,
  ) {}

  public async generateToken({
    email,
  }: GenerateResetPasswordTokenBo): Promise<void> {
    // Get user
    const user = await this.userService.read({ email });

    // Generate token
    const userToken = await this.userTokenService.generate({
      strategy: 'uuid',
      type: 'reset-password',
      userId: user.id,
    });

    // Send email containing the token
    this.emailService.send({
      data: {
        token: userToken.token,
      },
      locale: 'en-US',
      template: 'reset-password',
      to: {
        address: user.email,
        name: user.email,
      },
    });
  }

  public async validateToken({
    email,
    token,
  }: ValidateResetPasswordTokenBo): Promise<{
    user: UserEntity;
    userToken: UserTokenEntity;
  }> {
    // Get user
    const user = await this.userService.read({ email });

    // Validate token
    const userToken = await this.userTokenService.validate({
      token,
      userId: user.id,
    });

    return {
      user,
      userToken,
    };
  }

  public async resetPassword({
    email,
    password,
    token,
  }: ResetPasswordBo): Promise<void> {
    // Validate token
    const { user, userToken } = await this.validateToken({ email, token });

    // Update user password
    user.password = await this.hashService.hashify(password);
    await this.userService.save(user);

    // Delete token
    await this.userTokenService.delete(userToken.id);
  }
}
