import { postgresQuery } from '../db/postgres-helpers';
import { ABooking, BookingStatus, BookingType, FBooking, Schedule, UBooking } from '../models/Booking';
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
  const start = toSQLTimestamp(new Date(booking.start_time));
  const end = toSQLTimestamp(new Date(booking.end_time));
  await postgresQuery<ABooking>(
    `insert into bookings (type, room_id, start_time, end_time, capacity) values
      ('${BookingType.OTHER}',
      ${booking.room_id},
      '${start}', '${end}',
      ${booking.type === BookingType.PERSONAL ? 2 : 21})`,
  );
};

const updateOne = async (booking: UBooking): Promise<void> => {
  const start = toSQLTimestamp(new Date(booking.start_time));
  const end = toSQLTimestamp(new Date(booking.end_time));
  await postgresQuery<UBooking>(
    `update bookings
      set start_time='${start}', end_time='${end}', room_id=${booking.room_id}
      where booking_id=${booking.booking_id}`,
  );
};

const cancelOne = async (booking_id: number): Promise<void> => {
  await postgresQuery<Schedule>(
    `update bookings set status='${BookingStatus.CANCELLED}'
      where booking_id=${booking_id}`,
  );
};


const getByClass = async (class_id: number): Promise<FBooking[]> => {
  const bookings = await postgresQuery<FBooking>(
    `select b.booking_id, b.type, b.room_id, b.class_id, r.name as room_name, c.name as class_name,
    b.status, c.description, b.capacity, b.start_time, b.end_time,
    (select count(*) from member_schedules as ms where ms.booking_id=b.booking_id) as member_count,
    (select count(*) from trainer_schedules as ts where ts.booking_id=b.booking_id) as trainer_count
    
    from bookings as b
    left join classes as c on b.class_id=c.class_id
    join rooms as r on b.room_id=r.room_id
    where c.class_id='${class_id}'`,
  );
  return bookings.map(e => ({...e,
    member_count: Number(e.member_count),
    trainer_count: Number(e.trainer_count),
  }));
};
/**
 * Gets all bookings
 * @returns all bookings
 */
const getAll = async (): Promise<FBooking[]> => {
  const bookings = await postgresQuery<FBooking>(
    `select b.booking_id, b.type, b.room_id, b.class_id, r.name as room_name, c.name as class_name,
    b.status, c.description, b.capacity, b.start_time, b.end_time,
    (select count(*) from member_schedules as ms where ms.booking_id=b.booking_id) as member_count,
    (select count(*) from trainer_schedules as ts where ts.booking_id=b.booking_id) as trainer_count
    
    from bookings as b
    left join classes as c on b.class_id=c.class_id
    join rooms as r on b.room_id=r.room_id;`,
  );
  return bookings.map(e => ({...e,
    member_count: Number(e.member_count),
    trainer_count: Number(e.trainer_count),
  }));
};
/**
 * Gets all scheduled bookings
 * @returns all bookings
 */
const getAllScheduled = async (): Promise<FBooking[]> => {
  const bookings = await postgresQuery<FBooking>(
    `select b.booking_id, b.type, b.room_id, b.class_id, r.name as room_name, c.name as class_name,
    b.status, c.description, b.capacity, b.start_time, b.end_time,
    (select count(*) from member_schedules as ms where ms.booking_id=b.booking_id) as member_count,
    (select count(*) from trainer_schedules as ts where ts.booking_id=b.booking_id) as trainer_count
    
    from bookings as b
    left join classes as c on b.class_id=c.class_id
    join rooms as r on b.room_id=r.room_id
    where status='${BookingStatus.SCHEDULED}'`,
  );
  return bookings.map(e => ({...e,
    member_count: Number(e.member_count),
    trainer_count: Number(e.trainer_count),
  }));
};

/**
 * Gets one booking using the id
 * @param id id of the booking
 * @returns the booking if there is one with the provided id, otherwise null.
 */
const getOne = async (id: number): Promise<FBooking | null> => {
  const booking = await postgresQuery<FBooking>(
    `select b.booking_id, b.type, b.room_id, b.class_id, r.name as room_name, c.name as class_name,
    b.status, c.description, b.capacity, b.start_time, b.end_time,
    (select count(*) from member_schedules as ms where ms.booking_id=b.booking_id) as member_count,
    (select count(*) from trainer_schedules as ts where ts.booking_id=b.booking_id) as trainer_count
    
    from bookings as b
    left join classes as c on b.class_id=c.class_id
    join rooms as r on b.room_id=r.room_id
    where booking_id=${id}`);
  return booking.length == 0 ? null : booking.map(e => ({...e,
    member_count: Number(e.member_count),
    trainer_count: Number(e.trainer_count),
  }))[0];
};
/**
 * Gets one booking using the room id
 * @param id id of the room
 * @returns the booking if there is one with the provided room id, otherwise null.
 */
const getByRoom = async (id: number): Promise<FBooking[]> => {
  const bookings = await postgresQuery<FBooking>(
    `select b.booking_id, b.type, b.room_id, b.class_id, r.name as room_name, c.name as class_name,
    b.status, c.description, b.capacity, b.start_time, b.end_time,
    (select count(*) from member_schedules as ms where ms.booking_id=b.booking_id) as member_count,
    (select count(*) from trainer_schedules as ts where ts.booking_id=b.booking_id) as trainer_count
    
    from bookings as b
    left join classes as c on b.class_id=c.class_id
    join rooms as r on b.room_id=r.room_id
    where r.room_id=${id}`);
  return bookings.map(e => ({...e,
    member_count: Number(e.member_count),
    trainer_count: Number(e.trainer_count),
  }));
};


export default {
  addRegularBooking,
  addClassBooking,
  updateOne,
  cancelOne,
  getAll,
  getAllScheduled,
  getByClass,
  getOne,
  getByRoom,
} as const;