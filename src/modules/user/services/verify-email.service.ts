import { Injectable } from '@nestjs/common';

import { EmailService } from 'providers/email/services/email.service';
import { HashService } from 'providers/hash/services/hash.service';

import { VerifyEmailBo } from '../bos/verify-email.bo';
import { UserEntity } from '../entities/user.entity';
import { UserEmailAlreadyVerifiedException } from '../exceptions/user.exception';
import { UserTokenService } from './user-token.service';
import { UserService } from './user.service';

@Injectable()
export class VerifyEmailService {
  constructor(
    private readonly emailService: EmailService,
    private readonly hashService: HashService,
    private readonly userService: UserService,
    private readonly userTokenService: UserTokenService,
  ) {}

  public async generateToken(user: UserEntity): Promise<void> {
    // If already verified, throw exception
    if (user.isEmailVerified) {
      throw new UserEmailAlreadyVerifiedException();
    }

    // Generate token
    const userToken = await this.userTokenService.generate({
      strategy: 'uuid',
      type: 'verify-email',
      userId: user.id,
    });

    // Send email containing the token
    this.emailService.send({
      data: {
        token: userToken.token,
      },
      locale: 'en-US',
      template: 'verify-email',
      to: {
        address: user.email,
        name: user.email,
      },
    });
  }

  public async verifyEmail({
    data: { token },
    user,
  }: {
    data: VerifyEmailBo;
    user: UserEntity;
  }): Promise<void> {
    // If already verified, throw exception
    if (user.isEmailVerified) {
      throw new UserEmailAlreadyVerifiedException();
    }

    // Validate token
    const userToken = await this.userTokenService.validate({
      token,
      userId: user.id,
    });

    // Update user status
    user.isEmailVerified = true;
    await this.userService.save(user);

    // Delete token
    await this.userTokenService.delete(userToken.id);
  }
}
