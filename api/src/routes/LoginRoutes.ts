import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import MemberRepo from '@src/repos/MemberRepo';
import { ISessionUser } from '@src/models/Session';
import SessionModel from '@src/models/Session';
import logger from 'jet-logger';


const login = async (
  req: IReq<{ email: string, password: string }>,
  res: IRes,
) => {
  const { email: email, password: password } = req.body;
  const member = await MemberRepo.getOne(email);
  if (member && member.password === password) {
    const session = req.session as ISessionUser;
    session.user = SessionModel.memberSessionFrom(member);
    logger.info(`Logged in ${email}`);
    return res.status(HttpStatusCodes.OK).json({ message: 'Logged in.' });
  }

  return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'Email or password incorrect.',
  });
};


const logout = (
  req: IReq<{ email: string, password: string }>,
  res: IRes,
) => {
  const session = req.session as ISessionUser;
  if (!session.user) {
    return res.status(HttpStatusCodes.ACCEPTED).json({
      message: 'Already logged out.',
    });
  }
  const email = session.user.email;
  req.session.destroy((err) => {
    if (err) {
      logger.err(`Logging ${email} out failed. Error: ${err}`);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Logging out failed.',
      });
    } else {
      logger.info(`Logged out ${email}`);
      return res.status(HttpStatusCodes.OK).json({ message: 'Logged out.' });
    }
  });
  // logout
};

export default {
  login: login,
  logout: logout,
} as const;
