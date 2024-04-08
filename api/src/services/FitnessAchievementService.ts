import { postgresQuery } from '@src/db/postgres-helpers';
import { AFitnessAchievement, IFitnessAchievement } from '@src/models/FitnessAchievement';
import logger from 'jet-logger';

/**
 * gets all fitness achievements of a specific member
 * @returns all fitness achievements of a specific member
 */
const getAll = async (member_email: string): Promise<IFitnessAchievement[]> => {
  const fitnessAchievement = await postgresQuery<IFitnessAchievement>(
    `select * from fitness_achievements where member_email='${member_email}'`,
  );
  return fitnessAchievement;
};

/**
 * Adds a fitness achievement
 * @param fa fitness achievement
 */
const addOne = async (fa: AFitnessAchievement): Promise<void> => {
  await postgresQuery<AFitnessAchievement>(
    `insert into fitness_achievements (member_email,description)
    values ('${fa.member_email}', '${fa.description}')`,
  );
  logger.info(`Adding a fitness achievement for ${fa.member_email}`);
};


/**
 * Updates a fitness achievement
 * @param fa fitness achievement
 */
const updateOne = async (fa: IFitnessAchievement): Promise<void> => {
  await postgresQuery<IFitnessAchievement>(
    `update fitness_achievements
      set description='${fa.description}'
      where fitness_achievements_id=${fa.fitness_achievements_id};`,
  );
};

/**
 * Deletes a fitness achievement 
 * @param id fitness achievements id
 */
const deleteOne = async (id: number): Promise<void> => {
  await postgresQuery<IFitnessAchievement>(
    `delete from fitness_achievements
      where fitness_achievements_id=${id};`,
  );
};


export default {
  getAll,
  addOne,
  updateOne,
  deleteOne,
} as const;