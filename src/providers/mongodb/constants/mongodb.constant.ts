export const mongodbConfig = () => {
  const host =
    process.env.NODE_ENV === 'production'
      ? process.env.MONGODB_HOST_DOCKER
      : process.env.MONGODB_HOST_LOCAL;
  const port =
    process.env.NODE_ENV === 'production'
      ? process.env.MONGODB_PORT_DOCKER
      : process.env.MONGODB_PORT_LOCAL;
  const user = process.env.MONGODB_USERNAME;
  const pass = process.env.MONGODB_PASSWORD;
  const dbName = process.env.MONGODB_DATABASE;

  return {
    uri: `mongodb://${host}:${port}`,
    user,
    pass,
    dbName,
  };
};
