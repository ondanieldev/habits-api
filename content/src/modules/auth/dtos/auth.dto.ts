import { IsString } from 'class-validator';

import { AuthSignInBo } from '../bos/auth.bo';

export class AuthSignInDto implements AuthSignInBo {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
