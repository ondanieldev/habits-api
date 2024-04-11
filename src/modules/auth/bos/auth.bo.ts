export interface AuthSignInBo {
  email: string;
  password: string;
}

export interface AuthUserBo {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}
