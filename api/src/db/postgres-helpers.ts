import { DB_CONFIG } from './../constants/DBConfig';
import { connect } from 'ts-postgres';

/**
 * Runs a Postgres query
 * @param query query as is
 * @returns a list of those values
 */
const postgresQuery = async <T>(query: string): Promise<T[]> => {
  await using client = await connect(DB_CONFIG);
  const values: T[] = [];
  const res = await client.query<T>(query);
  for await (const obj of res) {
    values.push(obj);
  }
  return values;
};

export {
  postgresQuery,
};