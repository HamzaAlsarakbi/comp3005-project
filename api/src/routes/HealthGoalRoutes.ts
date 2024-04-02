import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import HealthGoalService from '@src/services/HealthGoalService';
import { IReq, IRes } from './types/express/misc';
import { ISessionUser } from '@src/models/Session';
import { AHealthGoal, IHealthGoal } from '@src/models/HealthGoal';


const getAll = async (req: IReq, res: IRes) => {
  const session = req.session as ISessionUser;
  if(!session.user) res.status(HttpStatusCodes.UNAUTHORIZED).end();
  res.status(HttpStatusCodes.OK).json(await HealthGoalService.getAll(session.user!.email));
};

const addOne = async (req: IReq<{ health_goal: AHealthGoal }>, res: IRes) => {
  const { health_goal } = req.body;
  await HealthGoalService.addOne(health_goal);
  res.status(HttpStatusCodes.OK).json({ message: 'Added health goal.' });
};

const updateOne = async (req: IReq<{ health_goal: IHealthGoal }>, res: IRes) => {
  const { health_goal } = req.body;
  await HealthGoalService.updateOne(health_goal);
  res.status(HttpStatusCodes.OK).json({ message: 'Updated health goal.' });
};

const deleteOne = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id);
  if(isNaN(id)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'Health goal ID must be a number.',
  });
  await HealthGoalService.deleteOne(id);
  res.status(HttpStatusCodes.OK).json({ message: 'Deleted health goal.' });
};

export default {
  getAll,
  addOne,
  updateOne,
  deleteOne,
} as const;