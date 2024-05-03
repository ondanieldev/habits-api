import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { addHours, addMilliseconds, isPast } from 'date-fns';
import { v4 } from 'uuid';

import { jwtConstants } from 'modules/auth/constants/auth.constant';

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
  constructor(
    private jwtService: JwtService,
    private readonly userTokenRepository: UserTokenRepository,
  ) {}

  private generateRandomUuid(): string {
    return v4().split('-')[0];
  }

  private async generateJwt(userId: string): Promise<string> {
    return this.jwtService.signAsync({
      sub: userId,
    });
  }

  private generateRandomUuidExpiresAt(): Date {
    return addHours(new Date(), 1);
  }

  private generateJwtExpiresAt(): Date {
    return addMilliseconds(new Date(), jwtConstants.expiresInMs);
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
      case 'jwt':
        token = await this.generateJwt(userId);
        expiresAt = this.generateJwtExpiresAt();
        break;
      case 'uuid':
        token = this.generateRandomUuid();
        expiresAt = this.generateRandomUuidExpiresAt();
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

  public async read(data: Partial<UserTokenEntity>): Promise<UserTokenEntity> {
    const userToken = await this.userTokenRepository.find({ data });

    if (!userToken) {
      throw new UserTokenInvalidException();
    }

    return userToken;
  }
}
