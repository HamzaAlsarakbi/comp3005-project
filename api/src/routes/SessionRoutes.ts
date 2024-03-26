import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';

import { ISessionUser } from '@src/models/Session';


const check = (req: IReq, res: IRes) => {
  console.log('Verifying session.');
  console.log(req.session);
  const session = req.session as ISessionUser;
  if(session.user) {
    console.log('Session verified.');
    res.status(HttpStatusCodes.OK).json(session.user);
  }
  res.status(HttpStatusCodes.UNAUTHORIZED).json(
    { message: 'Unauthorized. Need to login.' });
};

export default {
  check: check,
} as const;
