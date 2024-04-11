import { IsString } from 'class-validator';

import { CreateUserBo } from 'modules/user/bos/user.bo';

import { AuthSignInBo } from '../bos/auth.bo';

export class AuthSignInDto implements AuthSignInBo {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class AuthSignUpDto implements CreateUserBo {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
