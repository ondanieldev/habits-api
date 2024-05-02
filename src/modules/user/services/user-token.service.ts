import { Injectable } from '@nestjs/common';
import { addHours, isPast } from 'date-fns';
import { v4 } from 'uuid';

import {
  CreateUserTokenBo,
  GenerateUserTokenBo,
  ValidateUserTokenBo,
} from '../bos/user-token.bo';
import { UserTokenEntity } from '../entities/user-token.entity';
import {
  UserTokenExpiredException,
  UserTokenGenerationException,
  UserTokenInvalidException,
} from '../exceptions/user-token.exception';
import { UserTokenRepository } from '../repositories/user-token.repository';

@Injectable()
export class UserTokenService {
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  private generateRandomUuid(): string {
    return v4().split('-')[0];
  }

  private generateDefaultExpiresAt(): Date {
    return addHours(new Date(), 1);
  }

  private async upsert({
    expiresAt,
    token,
    type,
    userId,
  }: CreateUserTokenBo): Promise<UserTokenEntity> {
    // Find similar token (same user and same type)
    let userToken = await this.userTokenRepository.find({
      data: {
        userId,
        type,
      },
    });

    // If exists, update and return
    if (userToken) {
      userToken.expiresAt = expiresAt;
      userToken.token = token;
      await this.userTokenRepository.save(userToken);
      return userToken;
    }

    // If does not exist, create and return
    userToken = await this.userTokenRepository.create({
      expiresAt,
      token,
      type,
      userId,
    });
    return userToken;
  }

  public async generate({
    type,
    userId,
    strategy,
  }: GenerateUserTokenBo): Promise<UserTokenEntity> {
    // Start with token and expire date empty
    let token: string | null = null;
    let expiresAt: Date | null = null;

    // Fill token and expire data given strategy
    switch (strategy) {
      case 'uuid':
        token = this.generateRandomUuid();
        expiresAt = this.generateDefaultExpiresAt();
        break;
      default:
        break;
    }

    // If fail to fill, throw exception
    if (!token || !expiresAt) {
      throw new UserTokenGenerationException();
    }

    // Save token
    const userToken = await this.upsert({
      expiresAt,
      token,
      type,
      userId,
    });

    return userToken;
  }

  public async validate({
    token,
    userId,
  }: ValidateUserTokenBo): Promise<UserTokenEntity> {
    // Get token
    const userToken = await this.userTokenRepository.find({
      data: { token, userId },
    });

    // If doest not exist, throw exception
    if (!userToken) {
      throw new UserTokenInvalidException();
    }

    // If token is expired, throw exception
    if (isPast(userToken.expiresAt)) {
      throw new UserTokenExpiredException();
    }

    return userToken;
  }

  public async delete(id: string): Promise<void> {
    await this.userTokenRepository.delete(id);
  }
}
