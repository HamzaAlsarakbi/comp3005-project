import { postgresQuery } from './../db/postgres-helpers';
import { BookingStatus, BookingType, IBooking } from './../models/Booking';
import { toSQLTimestamp } from './../util/misc';


const addOne = async (
  type: BookingType,
  room_id: number,
  start_time: Date,
  end_time: Date,
  capacity?: number,
): Promise<void> => {
  const start = toSQLTimestamp(start_time);
  const end = toSQLTimestamp(end_time);
  await postgresQuery<IBooking>(
    `insert into bookings (type, room_id, start_time, end_time, capacity) values
      ('${type}', ${room_id}, ${start}, ${end}, ${capacity ?? 21})`,
  );
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
  addOne,
  getAll,
  getAllScheduled,
  getOne,
  getByRoom,
} as const;