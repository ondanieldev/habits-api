export const jwtConstants = {
  secret: process.env.AUTH_JWT_SECRET,
  expiresIn: '1d',
  expiresInMs: 1000 * 60 * 60 * 24,
};
