export const redisConfig = {
  host:
    process.env.NODE_ENV === 'production'
      ? process.env.REDIS_HOST_DOCKER
      : process.env.REDIS_HOST_LOCAL,
  port:
    process.env.NODE_ENV === 'production'
      ? process.env.REDIS_PORT_DOCKER
      : process.env.REDIS_PORT_LOCAL,
  password: process.env.REDIS_PASSWORD,
};
