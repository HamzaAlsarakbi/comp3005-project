import { postgresQuery } from '@src/db/postgres-helpers';
import { AHealthGoal, IHealthGoal } from '@src/models/HealthGoal';
import logger from 'jet-logger';

/**
 * gets all health goals of a specific member
 * @returns all health goals of a specific member
 */
const getAll = async (member_email: string): Promise<IHealthGoal[]> => {
  const healthGoals = await postgresQuery<IHealthGoal>(
    `select * from health_goals where member_email='${member_email}'`,
  );
  return healthGoals;
};

/**
 * Adds a healthgoal
 * @param hg health goal
 */
const addOne = async (hg: AHealthGoal): Promise<void> => {
  await postgresQuery<AHealthGoal>(
    `insert into health_goals (member_email,description)
    values ('${hg.member_email}', '${hg.description}')`,
  );
  logger.info(`Adding a health goal for ${hg.member_email}`);
};


/**
 * Updates a health goal
 * @param hg health goal
 */
const updateOne = async (hg: IHealthGoal): Promise<void> => {
  await postgresQuery<IHealthGoal>(
    `update health_goals
      set description='${hg.description}'
      where health_goal_id=${hg.health_goal_id};`,
  );
};

/**
 * Deletes a health goal
 * @param id health goal id
 */
const deleteOne = async (id: number): Promise<void> => {
  await postgresQuery<IHealthGoal>(
    `delete from health_goals
      where health_goal_id=${id};`,
  );
};


export default {
  getAll,
  addOne,
  updateOne,
  deleteOne,
} as const;