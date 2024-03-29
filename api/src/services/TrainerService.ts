import { postgresQuery } from '@src/db/postgres-helpers';
import { ITrainer } from '@src/models/Trainer';

/**
 * Gets one trainer using the email
 * @param email email address of member
 * @returns the trainer if there is one with the provided email, otherwise null.
 */
const getOne = async (email: string): Promise<ITrainer | null> => {
  const trainer = await postgresQuery<ITrainer>(
    `select * from trainers where trainer_email='${email}'`);

  return trainer.length == 0 ? null : trainer[0];
};



export default {
  getOne,
};