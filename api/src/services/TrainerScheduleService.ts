import { postgresQuery } from '@src/db/postgres-helpers';
import { IBooking } from '@src/models/Booking';
import { ATrainerSchedule, ITrainerSchedule } from '@src/models/TrainerSchedule';



const addOne = async (schedule: ATrainerSchedule): Promise<void> => {
  await postgresQuery<ITrainerSchedule>(
    `insert into trainer_schedules (trainer_email, booking_id) values
      ('${schedule.trainer_email}', ${schedule.booking_id})`,
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

const isEnrolled = async(schedule: ATrainerSchedule): Promise<boolean> => {
  const s =  await postgresQuery<ATrainerSchedule>(
    `select *
      from trainer_schedules
      where trainer_email='${schedule.trainer_email}' and booking_id=${schedule.booking_id}`,
  );
  return s.length > 0;
};

const getAllBookings = async(trainer_email: string): Promise<IBooking[]> => {
  const periods =  await postgresQuery<IBooking>(
    `select b.* from trainer_schedules as ts
    join bookings as b on b.booking_id=ts.booking_id
    where ts.trainer_email='${trainer_email}';`,
  );
  return periods;
};

const deleteOne = async (schedule: ATrainerSchedule): Promise<void> => {
  await postgresQuery<ATrainerSchedule>(
    `delete from trainer_schedules
      where trainer_email='${schedule.trainer_email}' and booking_id=${schedule.booking_id}`,
  );
};

const deleteAllByBooking = async(booking_id: number): Promise<void> => {
  await postgresQuery<ATrainerSchedule>(
    `delete from trainer_schedules
      where booking_id=${booking_id}`,
  );
};



export default {
  addOne,
  getAllByEmail,
  getAllByBookingId,
  isEnrolled,
  getAllBookings,
  deleteOne,
  deleteAllByBooking,
} as const;