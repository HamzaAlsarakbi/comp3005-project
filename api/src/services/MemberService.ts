import { postgresQuery } from '@src/db/postgres-helpers';
import { Schedule } from '@src/models/Booking';
import { AddMember, IMember, UMember } from '@src/models/Member';
import logger from 'jet-logger';

/**
 * gets all members
 * @returns all members
 */
const getAll = async (): Promise<IMember[]> => {
  const members = await postgresQuery<IMember>('select * from members');
  return members;
};

const getSchedule = async(member_email: string): Promise<Schedule[]> => {
  const bookings = await postgresQuery<Schedule>(
    `select b.booking_id, b.start_time, b.end_time from member_schedules as ms
    join bookings as b on b.booking_id=ms.booking_id
    where ms.member_email='${member_email}';`,
  );
  return bookings;
}

/**
 * gets all members by a booking
 * @param booking_id the booking id to get all members 
 * @returns all members
 */
const getAllByBooking = async (booking_id: number): Promise<IMember[]> => {
  const members = await postgresQuery<IMember>(
    `select m.* from members as m
      join member_schedules as ms on ms.member_email=m.member_email
      where ms.booking_id=${booking_id}`,
  );
  return members;
};

/**
 * Gets one member using the email
 * @param email email address of member
 * @returns the member if there is one with the provided email, otherwise null.
 */
const getOne = async (email: string): Promise<IMember | null> => {
  const member = await postgresQuery<IMember>(
    `select * from members where member_email='${email}'`,
  );
  return member.length == 0 ? null : member[0];
};

/**
 * Updates a member
 * @param m member
 * @returns void
 */
const updateOne = async (m: UMember): Promise<void> => {
  const newAttributes: string[] = [];
  for (const key of Object.keys(m)) {
    if (!m[key] || key === 'member_email') continue;
    newAttributes.push(`${key}=${typeof m[key] === 'string' ?
      `'${m[key] as string}'` :
      String(m[key])}`);
  }
  if (newAttributes.length === 0) return;
  await postgresQuery<IMember>(
    `update members set ${newAttributes.join(',')} where member_email='${m.member_email}';`,
  );
};


/**
 * Adds a member
 * @param m member
 * @returns void
 */
const addOne = async (m: AddMember): Promise<void> => {
  const birthday = new Date(m.birthday).toISOString().split('T')[0];
  await postgresQuery<AddMember>(`
    insert into members (member_email,first_name, last_name,
      password, phone, birthday, gender)
    values ('${m.member_email}', '${m.first_name}', '${m.last_name}',
      '${m.password}', '${m.phone}', '${birthday}', '${m.gender}')
    `);
  logger.info('ADDING MEMBER ' + m.member_email);
};



export default {
  getAll,
  getSchedule,
  getAllByBooking,
  getOne,
  updateOne,
  addOne,
};