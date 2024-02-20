export const postgresqlConfig = {
  host:
    process.env.NODE_ENV === 'production'
      ? process.env.POSTGRESQL_HOST_DOCKER
      : process.env.POSTGRESQL_HOST_LOCAL,
  port:
    process.env.NODE_ENV === 'production'
      ? process.env.POSTGRESQL_PORT_DOCKER
      : process.env.POSTGRESQL_PORT_LOCAL,
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
};
