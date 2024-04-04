import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import RoomService from '@src/services/RoomService';
import { Period } from '@src/models/Booking';
import { IRoom } from '@src/models/Room';

const getAll = async (_: IReq, res: IRes) => {
  const rooms = await RoomService.getAll();
  return res.status(HttpStatusCodes.OK).json({ rooms: rooms });
};

const getAllAvailable = async(req: IReq<{ period: Period }>, res: IRes) => {
  console.log(req.body);
  const { period: period } = req.body;
  const startTime = new Date(new Date(period.start_time).getTime() - (4 * 60 * 60 * 1000));
  const endTime = new Date(new Date(period.end_time).getTime() - (4 * 60 * 60 * 1000));
  const roomBookings = (await RoomService.getAllRoomBookings());
  const allRooms = await RoomService.getAll();
  const currentDate = new Date(); // Get the current date and time
  for(const rb of roomBookings) {
    console.log(rb.end_time, startTime, rb.end_time <= startTime);
    console.log(endTime, rb.start_time, rb.start_time >= endTime);
    if(!(rb.end_time <= startTime || rb.start_time >= endTime)) {
      console.log('remove ' + rb.room_id);
      for(let i = 0; i < allRooms.length; i++) {
        if(allRooms[i].room_id === rb.room_id) {
          allRooms.splice(i, 1);
          break;
        }
      }
    }
  }
  return res.status(HttpStatusCodes.OK).json({ rooms: allRooms });
}


export default {
  getAll,
  getAllAvailable,
} as const;