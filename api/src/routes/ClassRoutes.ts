import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import ClassService from '@src/services/ClassService';


async function getAll(_: IReq, res: IRes) {
  const classes = await ClassService.getAll();
  return res.status(HttpStatusCodes.OK).json({ classes: classes });
}

export default {
  getAll,
} as const;