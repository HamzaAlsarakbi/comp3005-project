/* eslint-disable no-console */
import { connect } from 'ts-postgres';
import parseSqlFile from './../../util/sql-query-parser';
import { DB_CONFIG } from '../../../constants/DBConfig';
import BookingsService from './../../../services/BookingsService';
import { BookingType } from './../../../models/Booking';
import { IRoom } from './../../../models/Room';
import RoomService from './../../../services/RoomService';
import { randomInt } from 'crypto';

const sqlFilePath = `${__dirname}/bookings-table.sql`;

interface TempBooking {
  room_id: number;
  start: Date;
  end: Date;
}


const generateBookings = async (size: number) => {
  const baseQueries = parseSqlFile(sqlFilePath);
  await using client = await connect(DB_CONFIG);
  console.log('Bookings table generator.');
  console.log('\tDropping table.');
  for (const query of baseQueries) {
    const res = await client.query(query);
    console.log(`\t\t${res.status}`);
  }
  const rooms: IRoom[] = await RoomService.getAll();
  const currentBookings: TempBooking[] = [];
  for (let i = 0; i < size; i++) {
    const bookingType = i % 3 == 0 ? BookingType.GROUP :
      i % 3 == 1 ? BookingType.PERSONAL : BookingType.GROUP;
    const newBooking = getValidBooking(currentBookings, rooms);
    if (!newBooking) break;
    

    BookingsService.addOne(
      bookingType,
      newBooking.room_id,
      newBooking.start,
      newBooking.end,
      bookingType == BookingType.PERSONAL ? 2 : randomInt(4, 21),
    )
  }
};


const getValidBooking = (currentBookings: TempBooking[], rooms: IRoom[]): TempBooking | null => {
  for(const room of rooms) {
    for(const cb of currentBookings) {
      // if(cb.room_id == )
    }
  }
  return null;
}




export default generateBookings;