import { postgresQuery } from '@src/db/postgres-helpers';
import { IBooking } from '@src/models/Booking';
import { AMemberSchedule } from '@src/models/MemberSchedule';



const addOne = async (schedule: AMemberSchedule): Promise<void> => {
  await postgresQuery<AMemberSchedule>(
    `insert into member_schedules (member_email, booking_id) values
      ('${schedule.member_email}', ${schedule.booking_id})`,
  );
};

const deleteOne = async (schedule: AMemberSchedule): Promise<void> => {
  await postgresQuery<AMemberSchedule>(
    `delete from member_schedules
      where member_email='${schedule.member_email}' and booking_id=${schedule.booking_id}`,
  );
};

const isEnrolled = async(schedule: AMemberSchedule): Promise<boolean> => {
  const s =  await postgresQuery<AMemberSchedule>(
    `select *
      from member_schedules
      where member_email='${schedule.member_email}' and booking_id=${schedule.booking_id}`,
  );
  return s.length > 0;
};

const getAllBookings = async(member_email: string): Promise<IBooking[]> => {
  const periods =  await postgresQuery<IBooking>(
    `select b.* from member_schedules as ms
    join bookings as b on b.booking_id=ms.booking_id
    where ms.member_email='${member_email}';`,
  );
  return periods;
};



export default {
  getAllBookings,
  isEnrolled,
  addOne,
  deleteOne,
} as const;