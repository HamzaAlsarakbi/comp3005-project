import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import RoutineService from '@src/services/RoutineService';
import { IReq, IRes } from './types/express/misc';
import { ISessionUser } from '@src/models/Session';
import { ARoutine, IRoutine } from '@src/models/Routine';


const getAll = async (req: IReq, res: IRes) => {
  const session = req.session as ISessionUser;
  if(!session.user) res.status(HttpStatusCodes.UNAUTHORIZED).end();
  res.status(HttpStatusCodes.OK).json(await RoutineService.getAll(session.user!.email));
};

const addOne = async (req: IReq<{ routine: ARoutine }>, res: IRes) => {
  const { routine } = req.body;
  await RoutineService.addOne(routine);
  res.status(HttpStatusCodes.OK).json({ message: 'Added routine.' });
};

const updateOne = async (req: IReq<{ routine: IRoutine }>, res: IRes) => {
  const { routine } = req.body;
  await RoutineService.updateOne(routine);
  res.status(HttpStatusCodes.OK).json({ message: 'Updated routine.' });
};

const deleteOne = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id);
  if(isNaN(id)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'Health goal ID must be a number.',
  });
  await RoutineService.deleteOne(id);
  res.status(HttpStatusCodes.OK).json({ message: 'Deleted routine.' });
};

export default {
  getAll,
  addOne,
  updateOne,
  deleteOne,
} as const;