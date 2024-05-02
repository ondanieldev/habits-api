import { IsString } from 'class-validator';

import { UserVerifyEmailBo } from '../bos/user-verify-email.bo';

export class UserVerifyEmailDto implements UserVerifyEmailBo {
  @IsString()
  verifyEmailToken: string;
}
