import { postgresQuery } from '@src/db/postgres-helpers';
import { ITrainerSchedule } from '@src/models/TrainerSchedule';



const addOne = async (trainer_email: string, booking_id: number): Promise<void> => {
  await postgresQuery<ITrainerSchedule>(
    `insert into trainer_schedules (trainer_email, booking_id) values
      ('${trainer_email}', ${booking_id})`,
  );
};

const getAllByEmail = async (trainer_email: string): Promise<ITrainerSchedule[]> => {
  return await postgresQuery<ITrainerSchedule>(
    `select * from trainer_schedules where trainer_email='${trainer_email}'`,
  );
};

const getAllByBookingId = async (booking_id: number): Promise<ITrainerSchedule[]> => {
  return await postgresQuery<ITrainerSchedule>(
    `select * from trainer_schedules where booking_id=${booking_id}`,
  );
};



export default {
  addOne,
  getAllByEmail,
  getAllByBookingId,
} as const;