import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import MemberRepo from '@src/repos/MemberRepo';
import { ISessionUser } from '@src/models/Session';
import SessionModel from '@src/models/Session';


async function verifyLogin(
  req: IReq<{ email: string, password: string }>,
  res: IRes,
) {
  const { email: email, password: password } = req.body;
  const member = await MemberRepo.getOne(email);
  if (member && member.password === password) {
    const session = req.session as ISessionUser;
    console.log(req.session);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    session.user = SessionModel.memberSessionFrom(member);
    console.log(req.session);
    return res.status(HttpStatusCodes.OK).json({ message: 'Logged in.' });
  }
  // TODO: trainer and admin stuff goes here too



  return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'Username or password incorrect.',
  });
}

export default {
  verifyLogin: verifyLogin,
} as const;
