import { postgresQuery } from '../db/postgres-helpers';
import { ABooking, BookingStatus, BookingType, IBooking } from '../models/Booking';
import { toSQLTimestamp } from '../util/misc';

const addClassBooking = async (booking: ABooking): Promise<void> => {
  const start = toSQLTimestamp(new Date(booking.start_time));
  const end = toSQLTimestamp(new Date(booking.end_time));
  await postgresQuery<ABooking>(
    `insert into bookings (type, room_id, class_id, start_time, end_time, capacity) values
      ('${booking.type}',
      ${booking.room_id},
      ${booking.class_id!},
      '${start}', '${end}',
      ${booking.type === BookingType.PERSONAL ? 2 : 21})`,
  );
};

const addRegularBooking = async (booking: ABooking): Promise<void> => {
  const start = toSQLTimestamp(booking.start_time);
  const end = toSQLTimestamp(booking.end_time);
  await postgresQuery<ABooking>(
    `insert into bookings (type, room_id, start_time, end_time, capacity) values
      ('${BookingType.OTHER}',
      ${booking.room_id},
      ${start}, ${end},
      ${booking.type === BookingType.PERSONAL ? 2 : 21})`,
  );
};
const getAllClass = async (class_id: number): Promise<IBooking[]> => {
  const bookings = await postgresQuery<IBooking>(
    `select * from bookings where class_id='${class_id}'`,
  );
  return bookings;
};
/**
 * Gets all bookings
 * @returns all bookings
 */
const getAll = async (): Promise<IBooking[]> => {
  const bookings = await postgresQuery<IBooking>('select * from bookings');
  return bookings;
};
/**
 * Gets all scheduled bookings
 * @returns all bookings
 */
const getAllScheduled = async (): Promise<IBooking[]> => {
  const bookings = await postgresQuery<IBooking>(
    `select * from bookings where status='${BookingStatus.SCHEDULED}'`,
  );
  return bookings;
};
/**
 * Gets one booking using the id
 * @param id id of the booking
 * @returns the booking if there is one with the provided id, otherwise null.
 */
const getOne = async (id: string): Promise<IBooking | null> => {
  const booking = await postgresQuery<IBooking>(
    `select * from bookings where booking_id='${id}'`);
  return booking.length == 0 ? null : booking[0];
};
/**
 * Gets one booking using the room id
 * @param id id of the room
 * @returns the booking if there is one with the provided room id, otherwise null.
 */
const getByRoom = async (id: number): Promise<IBooking[]> => {
  const bookings = await postgresQuery<IBooking>(
    `select * from bookings where room_id='${id}'`);
  return bookings;
};


export default {
  addRegularBooking,
  addClassBooking,
  getAll,
  getAllScheduled,
  getAllClass,
  getOne,
  getByRoom,
} as const;