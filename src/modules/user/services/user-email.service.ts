import { Injectable } from '@nestjs/common';

import { UpdateUserEmailBo, ValidateUserEmailBo } from '../bos/user-email.bo';
import { UserEntity } from '../entities/user.entity';
import { UserEmailConflictException } from '../exceptions/user.exception';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserEmailService {
  constructor(private readonly userRepository: UserRepository) {}

  public async validate({ email, user }: ValidateUserEmailBo): Promise<void> {
    const existingUser = await this.userRepository.find({
      data: {
        email,
      },
    });
    if (existingUser && existingUser.id !== user?.id) {
      throw new UserEmailConflictException(email);
    }
  }

  public async update({ email, user }: UpdateUserEmailBo): Promise<UserEntity> {
    await this.validate({ email, user });
    user.email = email;
    user.isEmailVerified = false;
    await this.userRepository.save(user);
    return user;
  }
}
