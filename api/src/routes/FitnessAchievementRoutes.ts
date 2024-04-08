import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import FitnessAchievementService from '@src/services/FitnessAchievementService';
import { IReq, IRes } from './types/express/misc';
import { ISessionUser } from '@src/models/Session';
import { AFitnessAchievement, IFitnessAchievement } from '@src/models/FitnessAchievement';

const getAll = async (req: IReq, res: IRes) => {
  const session = req.session as ISessionUser;
  if(!session.user) res.status(HttpStatusCodes.UNAUTHORIZED).end();
  res.status(HttpStatusCodes.OK).json(await FitnessAchievementService.getAll(session.user!.email));
};

const addOne = async (req: IReq<{ fitness_achievement: AFitnessAchievement }>, res: IRes) => {
  const { fitness_achievement } = req.body;
  await FitnessAchievementService.addOne(fitness_achievement);
  res.status(HttpStatusCodes.OK).json({ message: 'Added fitness achievement.' });
};

const updateOne = async (req: IReq<{ fitness_achievement: IFitnessAchievement }>, res: IRes) => {
  const { fitness_achievement } = req.body;
  await FitnessAchievementService.updateOne(fitness_achievement);
  res.status(HttpStatusCodes.OK).json({ message: 'Updated fitness achievement.' });
};

const deleteOne = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id);
  if(isNaN(id)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'Fitness Achievement ID must be a number.',
  });
  await FitnessAchievementService.deleteOne(id);
  res.status(HttpStatusCodes.OK).json({ message: 'Deleted fitness achievement.' });
};

export default {
  getAll,
  addOne,
  updateOne,
  deleteOne,
} as const;