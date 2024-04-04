import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import MemberService from '@src/services/MemberService';
import { AddMember, UMember } from '@src/models/Member';
import { IReq, IRes } from './types/express/misc';
import { ISessionUser } from '@src/models/Session';
import SessionModel from '@src/models/Session';
import MemberScheduleService from '@src/services/MemberScheduleService';
import { AMemberSchedule } from '@src/models/MemberSchedule';
import BookingService from '@src/services/BookingService';

// Routes //



async function getAll(_: IReq, res: IRes) {
  const members = await MemberService.getAll();
  return res.status(HttpStatusCodes.OK).json({ members });
}

const getSchedule = async (req: IReq, res: IRes) => {
  const schedule = await MemberService.getSchedule(req.params.email);
  return res.status(HttpStatusCodes.OK).json({ schedule: schedule });
};

const getAllByBooking = async (req: IReq, res: IRes) => {
  const bookingId = Number(req.params.id);
  if (isNaN(bookingId)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'Booking id must be a number.',
  });
  const members = await MemberService.getAllByBooking(bookingId);
  return res.status(HttpStatusCodes.OK).json({ members });
};


const enroll = async (req: IReq, res: IRes) => {
  // verify booking id
  const bookingId = Number(req.params.id);
  if (isNaN(bookingId)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'Booking id must be a number.',
  });
  // verify session
  const session = req.session as ISessionUser;
  if (!session.user) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'No user session.',
  });
  // construct schedule
  const schedule: AMemberSchedule = {
    member_email: session.user.email,
    booking_id: bookingId,
  };
  await MemberScheduleService.addOne(schedule);
  return res.status(HttpStatusCodes.OK).json({ message: 'Member enrolled.' });
};

const isEnrolled = async (req: IReq, res: IRes) => {
  // verify booking id
  const bookingId = Number(req.params.id);
  if (isNaN(bookingId)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'Booking id must be a number.',
  });
  // verify session
  const session = req.session as ISessionUser;
  if (!session.user) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'No user session.',
  });
  // construct schedule
  const schedule: AMemberSchedule = {
    member_email: session.user.email,
    booking_id: bookingId,
  };
  const enrolled = await MemberScheduleService.isEnrolled(schedule);
  res.status(HttpStatusCodes.OK).json({ isEnrolled: enrolled });
};

const conflicts = async (req: IReq, res: IRes) => {
  // verify booking id
  const bookingId = Number(req.params.id);
  if (isNaN(bookingId)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'Booking id must be a number.',
  });
  // verify session
  const session = req.session as ISessionUser;
  if (!session.user) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'No user session.',
  });
  const bookings = await MemberScheduleService.getAllBookings(session.user.email);
  const booking = await BookingService.getOne(bookingId);

  for (const b of bookings) {
    if(booking?.booking_id === b.booking_id) continue;
    console.log(b.end_time, booking!.start_time, b.end_time <= booking!.start_time);
    console.log(booking!.end_time, b.start_time, b.start_time >= booking!.end_time);
    if (!(b.end_time <= booking!.start_time || b.start_time >= booking!.end_time)) {
      return res.status(HttpStatusCodes.OK).json({ conflictsWith: b });
    }
  }
  return res.status(HttpStatusCodes.OK).json({ conflictsWith: null });
};

const leave = async (req: IReq, res: IRes) => {
  // verify booking id
  const bookingId = Number(req.params.id);
  if (isNaN(bookingId)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'Booking id must be a number.',
  });
  // verify session
  const session = req.session as ISessionUser;
  if (!session.user) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'No user session.',
  });
  // construct schedule
  const schedule: AMemberSchedule = {
    member_email: session.user.email,
    booking_id: bookingId,
  };
  await MemberScheduleService.deleteOne(schedule);
  return res.status(HttpStatusCodes.OK).json({ message: 'Member left.' });
};

async function getOne(req: IReq, res: IRes) {
  const email = req.params.email;
  const member = await MemberService.getOne(email);
  if (!member) return res.status(HttpStatusCodes.NOT_FOUND).json({
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
  if (!session.user) {
    const addedMember = await MemberService.getOne(member.member_email);
    if (addedMember)
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
  getSchedule,
  getAllByBooking,
  getOne,
  isEnrolled,
  conflicts,
  enroll,
  leave,
  add,
  updateOne,
  // delete: delete_,
} as const;
