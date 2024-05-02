export interface GenerateResetPasswordTokenBo {
  email: string;
}

export interface ValidateResetPasswordTokenBo {
  email: string;
  token: string;
}

export interface ResetPasswordBo {
  email: string;
  password: string;
  token: string;
}
