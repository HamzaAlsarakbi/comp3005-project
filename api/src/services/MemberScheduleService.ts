import { postgresQuery } from '@src/db/postgres-helpers';
import { IMemberSchedule } from '@src/models/MemberSchedule';



const addOne = async (member_email: string, booking_id: number): Promise<void> => {
  await postgresQuery<IMemberSchedule>(
    `insert into member_schedules (member_email, booking_id) values
      ('${member_email}', ${booking_id})`,
  );
};

const getAllByEmail = async (member_email: string): Promise<IMemberSchedule[]> => {
  return await postgresQuery<IMemberSchedule>(
    `select * from member_schedules where member_email='${member_email}'`,
  );
};

const getAllByBookingId = async (booking_id: number): Promise<IMemberSchedule[]> => {
  return await postgresQuery<IMemberSchedule>(
    `select * from member_schedules where booking_id=${booking_id}`,
  );
};



export default {
  addOne,
  getAllByEmail,
  getAllByBookingId,
} as const;