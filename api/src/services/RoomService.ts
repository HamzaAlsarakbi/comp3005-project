import { postgresQuery } from './../db/postgres-helpers';
import { IRoom } from './../models/Room';

/**
 * gets all rooms
 * @returns all rooms
 */
const getAll = async(): Promise<IRoom[]> => {
  const rooms = await postgresQuery<IRoom>('select * from rooms');
  return rooms;
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
  getOne,
};