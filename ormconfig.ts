/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'projeto',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.ts}'],
  migrations: ['migrations/*.ts'],
} as DataSourceOptions);
