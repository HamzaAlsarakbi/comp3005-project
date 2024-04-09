import { Configuration } from 'ts-postgres';
import { userInfo } from 'os';

export const DB_CONFIG: Configuration = {
  user: 'postgres',
  // hacky solution for DB password. not ideal, but works for now
  password: userInfo().username.toLowerCase().includes('hamza') ? 'postgres' : 'student',
  host: 'localhost',
  port: 5432,
  database: 'comp3005proj',
};