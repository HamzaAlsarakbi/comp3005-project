import { postgresQuery } from '@src/db/postgres-helpers';
import { ARoutine, IRoutine } from '@src/models/Routine';
import logger from 'jet-logger';

/**
 * gets all routines of a specific member
 * @returns all routines of a specific member
 */
const getAll = async (member_email: string): Promise<IRoutine[]> => {
  const routines = await postgresQuery<IRoutine>(
    `select * from routines where member_email='${member_email}'`,
  );
  return routines;
};

/**
 * Adds a routine
 * @param r routine
 */
const addOne = async (r: ARoutine): Promise<void> => {
  await postgresQuery<ARoutine>(
    `insert into routines (member_email,description)
    values ('${r.member_email}', '${r.description}')`,
  );
  logger.info(`Adding a health goal for ${r.member_email}`);
};


/**
 * Updates a routine
 * @param r routine
 */
const updateOne = async (r: IRoutine): Promise<void> => {
  await postgresQuery<IRoutine>(
    `update routines
      set description='${r.description}'
      where routine_id=${r.routine_id};`,
  );
};

/**
 * Deletes a routine
 * @param id routine id
 */
const deleteOne = async (id: number): Promise<void> => {
  await postgresQuery<IRoutine>(
    `delete from routines
      where routine_id=${id};`,
  );
};


export default {
  getAll,
  addOne,
  updateOne,
  deleteOne,
} as const;