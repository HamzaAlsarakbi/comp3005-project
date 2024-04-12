import { postgresQuery } from '@src/db/postgres-helpers';
import { Schedule } from '@src/models/Booking';
import { ITrainer } from '@src/models/Trainer';


/**
 * gets all trainers
 * @returns all trainers
 */
const getAll = async(): Promise<ITrainer[]> => {
  const trainers = await postgresQuery<ITrainer>('select * from trainers');
  return trainers;
};

/**
 * Gets one trainer using the email
 * @param email email address of trainer
 * @returns the trainer if there is one with the provided email, otherwise null.
 */
const getOne = async (email: string): Promise<ITrainer | null> => {
  const trainer = await postgresQuery<ITrainer>(
    `select * from trainers where trainer_email='${email}'`);

  return trainer.length == 0 ? null : trainer[0];
};

const getSchedule = async(trainer_email: string): Promise<Schedule[]> => {
  const bookings = await postgresQuery<Schedule>(
    `select b.booking_id, b.start_time, b.end_time from trainer_schedules as ts
    join bookings as b on b.booking_id=ts.booking_id
    where ts.trainer_email='${trainer_email}';`,
  );
  return bookings;
};

/**
 * gets all trainers by a booking
 * @param booking_id the booking id to get all trainer
 * @returns all trainers
 */
const getAllByBooking = async (booking_id: number): Promise<ITrainer[]> => {
  const trainers = await postgresQuery<ITrainer>(
    `select t.* from trainers as t
      join trainer_schedules as ts on ts.trainer_email=t.trainer_email
      where ts.booking_id=${booking_id}`,
  );
  return trainers;
};


export default {
  getAll,
  getOne,
  getSchedule,
  getAllByBooking,
};