import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import TrainerService from '@src/services/TrainerService';

async function getAll(_: IReq, res: IRes) {
  const trainers = await TrainerService.getAll();
  return res.status(HttpStatusCodes.OK).json({ trainers: trainers });
}

async function getOne(req: IReq, res: IRes) {
  const email = req.params.email;
  const trainer = await TrainerService.getOne(email);
  if(!trainer) return res.status(HttpStatusCodes.NOT_FOUND).json({
    error: 'No trainer exists with the given email address.',
  });
  return res.status(HttpStatusCodes.OK).json({ trainer: trainer });
}


export default {
  getAll,
  getOne,
} as const;