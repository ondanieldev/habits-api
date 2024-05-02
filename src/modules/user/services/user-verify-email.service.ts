import { Injectable } from '@nestjs/common';
import { addHours, isPast } from 'date-fns';
import { v4 } from 'uuid';

import { UserEntity } from 'modules/user/entities/user.entity';
import { UserService } from 'modules/user/services/user.service';

import { EmailService } from 'providers/email/services/email.service';

import { UserVerifyEmailBo } from '../bos/user-verify-email.bo';
import { VerifyEmailTokenEntity } from '../entities/verify-email-token.entity';
import {
  VerifyEmailTokenExpiredException,
  VerifyEmailTokenInvalidException,
} from '../exceptions/verify-email-token.exception';

@Injectable()
export class UserVerifyEmailService {
  constructor(
    private emailService: EmailService,
    private usersService: UserService,
  ) {}

  async requestToken(user: UserEntity): Promise<VerifyEmailTokenEntity> {
    const verifyEmailToken = v4().split('-')[0];
    const verifyEmailTokenExpiresAt = addHours(new Date(), 1);

    user.verifyEmailToken = verifyEmailToken;
    user.verifyEmailTokenExpiresAt = verifyEmailTokenExpiresAt;

    await this.usersService.save(user);

    await this.emailService.send({
      data: {
        verifyEmailToken,
      },
      locale: 'pt-BR',
      template: 'verify-email',
      to: {
        address: user.email,
        name: user.email,
      },
    });

    return {
      verifyEmailToken,
      verifyEmailTokenExpiresAt,
    };
  }

  async validateToken({
    data,
    user,
  }: {
    user: UserEntity;
    data: UserVerifyEmailBo;
  }): Promise<void> {
    if (user.verifyEmailToken !== data.verifyEmailToken) {
      throw new VerifyEmailTokenInvalidException();
    }

    if (
      !user.verifyEmailTokenExpiresAt ||
      isPast(user.verifyEmailTokenExpiresAt)
    ) {
      throw new VerifyEmailTokenExpiredException();
    }

    user.isEmailVerified = true;
    user.verifyEmailToken = null;
    user.verifyEmailTokenExpiresAt = null;

    await this.usersService.save(user);
  }
}
