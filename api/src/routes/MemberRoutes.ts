import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import MemberService from '@src/services/MemberService';
import { AddMember, UMember } from '@src/models/Member';
import { IReq, IRes } from './types/express/misc';
import { ISessionUser } from '@src/models/Session';
import SessionModel from '@src/models/Session';

// Routes //



async function getAll(_: IReq, res: IRes) {
  const members = await MemberService.getAll();
  return res.status(HttpStatusCodes.OK).json({ members });
}

async function getOne(req: IReq, res: IRes) {
  const email = req.params.email;
  const member = await MemberService.getOne(email);
  if(!member) return res.status(HttpStatusCodes.NOT_FOUND).json({
    error: 'No Member exists with the given email address.',
  });
  return res.status(HttpStatusCodes.OK).json({ member });
}

async function add(req: IReq<{ member: AddMember }>, res: IRes) {
  const { member: member } = req.body;
  if (await MemberService.getOne(member.member_email)) {
    console.log('bad request');
    return res.status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: 'Member with this email already exists.' });
  }
  console.log('adding');
  await MemberService.addOne(member);

  const session = req.session as ISessionUser;
  if(!session.user) {
    const addedMember = await MemberService.getOne(member.member_email);
    if(addedMember)
      session.user = SessionModel.fromMember(addedMember);
  }
  return res.status(HttpStatusCodes.CREATED)
    .json({ message: 'Member added.' });
}

async function updateOne(req: IReq<{ member: UMember }>, res: IRes) {
  const { member: member } = req.body;
  await MemberService.updateOne(member);
  return res.status(HttpStatusCodes.OK).json({ message: 'Member updated successfully' });
}

// async function delete_(req: IReq, res: IRes) {
//   const email = +req.params.email;
//   await memberservice.delete(email);
//   return res.status(HttpStatusCodes.OK).end();
// }


export default {
  getAll,
  getOne,
  add,
  updateOne,
  // delete: delete_,
} as const;
