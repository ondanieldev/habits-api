import { Injectable } from '@nestjs/common';

import { UpsertUserPreferenceBo } from '../bos/user-preference.bo';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserPreferenceService {
  constructor(private readonly userRepositoy: UserRepository) {}

  async update({
    user,
    data,
  }: {
    user: UserEntity;
    data: UpsertUserPreferenceBo;
  }) {
    Object.assign(user, data);
    await this.userRepositoy.save(user);
    return user;
  }
}
