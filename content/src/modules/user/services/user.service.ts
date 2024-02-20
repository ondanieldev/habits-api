import { Injectable, OnModuleInit } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import {
  OffsetPaginated,
  OffsetPaginationBo,
} from 'common/bos/offset-pagination.bo';

import { CacheService } from 'providers/cache/services/cache.service';
import { HashService } from 'providers/hash/services/hash.service';

import { CreateUserBo } from '../bos/user.bo';
import { UserEntity } from '../entities/user.entity';
import {
  UserConflictException,
  UserNotFoundException,
} from '../exceptions/user.exception';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly cacheService: CacheService,
    private readonly hashService: HashService,
    private readonly userRepository: UserRepository,
  ) {}

  async onModuleInit() {
    try {
      await this.create({
        email: 'test@test.com',
        password: '123456',
      });
    } catch {
      //
    }
  }

  public async create({
    email,
    password,
    ...rest
  }: CreateUserBo): Promise<UserEntity> {
    let user = await this.userRepository.find({
      data: {
        email,
      },
    });
    if (user) {
      throw new UserConflictException();
    }
    user = await this.userRepository.create({
      ...rest,
      email,
      password: await this.hashService.hashify(password),
    });
    return user;
  }

  public async read(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.find({
      data,
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  public async readAll({
    limit,
    page,
  }: OffsetPaginationBo): Promise<OffsetPaginated<UserEntity>> {
    let users = await this.cacheService.get<OffsetPaginated<UserEntity>>(
      `users:${limit}:${page}`,
    );
    if (!users) {
      users = await this.userRepository.findMany({
        data: {},
        pagination: {
          limit,
          page,
        },
      });
      await this.cacheService.set(
        `users:${limit}:${page}`,
        instanceToPlain(users),
      );
    }

    return users;
  }
}
