import { IsString } from 'class-validator';

import { Trim } from 'modules/auth/decorators/trim.decorator';

import { VerifyEmailBo } from '../bos/verify-email.bo';

export class VerifyEmailDto implements VerifyEmailBo {
  @IsString()
  @Trim()
  token: string;
}
