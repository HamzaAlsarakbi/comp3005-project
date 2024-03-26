import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import memberservice from '@src/services/MemberService';
import { IMember } from '@src/models/Member';
import { IReq, IRes } from './types/express/misc';

// Routes //



async function getAll(_: IReq, res: IRes) {
  const members = await memberservice.getAll();
  return res.status(HttpStatusCodes.OK).json({ members });
}

async function add(req: IReq<{member: IMember}>, res: IRes) {
  const { member: member } = req.body;
  await memberservice.addOne(member);
  return res.status(HttpStatusCodes.CREATED).end();
}

async function update(req: IReq<{member: IMember}>, res: IRes) {
  const { member: member } = req.body;
  await memberservice.updateOne(member);
  return res.status(HttpStatusCodes.OK).end();
}

// async function delete_(req: IReq, res: IRes) {
//   const email = +req.params.email;
//   await memberservice.delete(email);
//   return res.status(HttpStatusCodes.OK).end();
// }


export default {
  getAll,
  add,
  update,
  // delete: delete_,
} as const;
