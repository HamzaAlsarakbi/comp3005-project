import { postgresQuery } from '@src/db/postgres-helpers';
import { IClass } from '@src/models/Class';

/**
 * gets all classes
 * @returns all classes
 */
const getAll = async(): Promise<IClass[]> => {
  const classes = await postgresQuery<IClass>('select * from classes');
  return classes;
};


export default {
  getAll,
} as const;