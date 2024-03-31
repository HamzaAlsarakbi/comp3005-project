import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import RoomService from '@src/services/RoomService';

async function getAll(_: IReq, res: IRes) {
  const rooms = await RoomService.getAll();
  return res.status(HttpStatusCodes.OK).json({ rooms: rooms });
}


export default {
  getAll,
} as const;