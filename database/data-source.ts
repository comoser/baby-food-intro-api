import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

// General DB connection config
const ormDbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  schema: 'public',
  url: process.env.DATABASE_URL,
  migrationsTableName: 'migrations',
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
  logging: false,
};

// Specific config for production
const ormConfigProduction: Partial<PostgresConnectionOptions> = {
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Specific config for development
const ormConfigDevelopment: Partial<PostgresConnectionOptions> = {
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
};

// Load the corresponding environment config
const envConfig =
  process.env.NODE_ENV === 'production'
    ? ormConfigProduction
    : ormConfigDevelopment;

// Final config object
export const OrmConfig: PostgresConnectionOptions = {
  ...ormDbConfig,
  ...envConfig,
};

export default new DataSource(OrmConfig);
