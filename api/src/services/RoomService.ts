import { postgresQuery } from './../db/postgres-helpers';
import { IRoom, RoomBooking } from './../models/Room';

/**
 * gets all rooms
 * @returns all rooms
 */
const getAll = async(): Promise<IRoom[]> => {
  const rooms = await postgresQuery<IRoom>('select * from rooms');
  return rooms;
};


const getAllRoomBookings = async(): Promise<RoomBooking[]> => {
  const roomBookings = await postgresQuery<RoomBooking>(
    `select b.booking_id, b.room_id, r.name, b.start_time, b.end_time
    from bookings as b join rooms as r on r.room_id=b.room_id where not b.status='cancelled';`,
  );
  return roomBookings;
};

/**
 * Gets one trainer using the id
 * @param id id of the room
 * @returns the room if there is one with the provided id, otherwise null.
 */
const getOne = async (id: string): Promise<IRoom | null> => {
  const room = await postgresQuery<IRoom>(
    `select * from rooms where room_id='${id}'`);

  return room.length == 0 ? null : room[0];
};



export default {
  getAll,
  getAllRoomBookings,
  getOne,
};