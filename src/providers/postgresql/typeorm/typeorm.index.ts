import 'dotenv/config';
import { DataSource } from 'typeorm';

import { postgresqlConfig } from '../constants/postgresl.constant';

// AppDataSource must be exported outside Database class in order to be used by TypeORM CLI
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: postgresqlConfig.host,
  port: postgresqlConfig.port ? Number(postgresqlConfig.port) : undefined,
  username: postgresqlConfig.username,
  password: postgresqlConfig.password,
  database: postgresqlConfig.database,
  migrations: ['src/**/migrations/*.ts'],
});
