export const userTokenTypes = [
  'auth',
  'reset-password',
  'verify-email',
] as const;

export type UserTokenType = (typeof userTokenTypes)[number];
