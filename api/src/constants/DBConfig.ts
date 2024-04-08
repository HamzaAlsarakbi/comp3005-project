import { Configuration } from 'ts-postgres';

export const DB_CONFIG: Configuration = {
  user: 'postgres',
  password: 'student',
  host: 'localhost',
  port: 5432,
  database: 'comp3005proj',
};