import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import TrainerService from '@src/services/TrainerService';

async function getAll(_: IReq, res: IRes) {
  const trainers = await TrainerService.getAll();
  return res.status(HttpStatusCodes.OK).json({ trainers: trainers });
}


export default {
  getAll,
} as const;