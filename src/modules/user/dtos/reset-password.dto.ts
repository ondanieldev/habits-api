import { IsEmail, IsString } from 'class-validator';

import { ToLowerCase } from 'modules/auth/decorators/to-lower-case.decorator';
import { Trim } from 'modules/auth/decorators/trim.decorator';

import {
  GenerateResetPasswordTokenBo,
  ResetPasswordBo,
  ValidateResetPasswordTokenBo,
} from '../bos/reset-password.bo';

export class GenerateResetPasswordTokenDto
  implements GenerateResetPasswordTokenBo
{
  @IsEmail()
  @Trim()
  @ToLowerCase()
  email: string;
}

export class ValidateResetPasswordTokenDto
  implements ValidateResetPasswordTokenBo
{
  @IsEmail()
  @Trim()
  @ToLowerCase()
  email: string;

  @IsString()
  @Trim()
  token: string;
}

export class ResetPasswordDto implements ResetPasswordBo {
  @IsEmail()
  @Trim()
  @ToLowerCase()
  email: string;

  @IsString()
  @Trim()
  password: string;

  @IsString()
  @Trim()
  token: string;
}
