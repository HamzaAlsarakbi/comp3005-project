import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';

import { ISessionUser } from '@src/models/Session';
import logger from 'jet-logger';


const check = (req: IReq, res: IRes) => {
  const session = req.session as ISessionUser;
  if(session.user) {
    return res.status(HttpStatusCodes.OK).json(session.user);
  }
  logger.warn('Session Invalid!!');
  return res.status(HttpStatusCodes.UNAUTHORIZED).json({
    error: 'Unauthorized. Need to login.',
  });
};

export default {
  check: check,
} as const;
