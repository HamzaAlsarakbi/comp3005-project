import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import { ISessionUser } from '@src/models/Session';
import SessionModel from '@src/models/Session';
import logger from 'jet-logger';
import MemberService from '@src/services/MemberService';
import AdminService from '@src/services/AdminService';
import TrainerService from '@src/services/TrainerService';


const login = async (
  req: IReq<{ email: string, password: string }>,
  res: IRes,
) => {
  const { email: email, password: password } = req.body;
  const session = req.session as ISessionUser;

  // already logged in
  if(session.user) {
    return res.status(HttpStatusCodes.OK).json({ message: 'Already logged in.' });
  }
  
  // member login
  console.log(email);
  const member = await MemberService.getOne(email);
  if (member && member.password === password) {
    session.user = SessionModel.fromMember(member);
  }
  // trainer login
  const trainer = await TrainerService.getOne(email);
  if (trainer && trainer.password === password) {
    session.user = SessionModel.fromTrainer(trainer);
  }
  // admin login
  const admin = await AdminService.getOne(email);
  if (admin && admin.password === password) {
    session.user = SessionModel.fromAdmin(admin);
  }

  // if there is a valid session
  if(session.user) {
    logger.info(`Logged in ${email}`);
    return res.status(HttpStatusCodes.OK).json({ message: 'Logged in.' });
  }

  // no valid session
  return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'Email or password incorrect.',
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
        error: 'Logging out failed.',
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
