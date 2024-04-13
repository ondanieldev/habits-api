import { IsString } from 'class-validator';

import { CreateUserBo } from 'modules/user/bos/user.bo';

import { AuthSignInBo } from '../bos/auth.bo';
import { ToLowerCase } from '../decorators/to-lower-case.decorator';

export class AuthSignInDto implements AuthSignInBo {
  @IsString()
  @ToLowerCase()
  email: string;

  @IsString()
  password: string;
}

export class AuthSignUpDto implements CreateUserBo {
  @IsString()
  @ToLowerCase()
  email: string;

  @IsString()
  password: string;
}
