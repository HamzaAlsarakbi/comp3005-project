import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import TrainerService from '@src/services/TrainerService';
import { ISessionUser } from '@src/models/Session';
import TrainerScheduleService from '@src/services/TrainerScheduleService';
import BookingService from '@src/services/BookingService';
import { ATrainerSchedule } from '@src/models/TrainerSchedule';

async function getAll(_: IReq, res: IRes) {
  const trainers = await TrainerService.getAll();
  return res.status(HttpStatusCodes.OK).json({ trainers: trainers });
}

async function getOne(req: IReq, res: IRes) {
  const email = req.params.email;
  const trainer = await TrainerService.getOne(email);
  if(!trainer) return res.status(HttpStatusCodes.NOT_FOUND).json({
    error: 'No trainer exists with the given email address.',
  });
  return res.status(HttpStatusCodes.OK).json({ trainer: trainer });
}

const getAllByBooking = async (req: IReq, res: IRes) => {
  const bookingId = Number(req.params.id);
  if (isNaN(bookingId)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    message: 'Booking id must be a number.',
  });
  const trainers = await TrainerService.getAllByBooking(bookingId);
  return res.status(HttpStatusCodes.OK).json({ trainers });
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
  const schedule: ATrainerSchedule = {
    trainer_email: session.user.email,
    booking_id: bookingId,
  };
  await TrainerScheduleService.addOne(schedule);
  return res.status(HttpStatusCodes.OK).json({ message: 'Trainer enrolled.' });
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
  const schedule: ATrainerSchedule = {
    trainer_email: session.user.email,
    booking_id: bookingId,
  };
  const enrolled = await TrainerScheduleService.isEnrolled(schedule);
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
  const bookings = await TrainerScheduleService.getAllBookings(session.user.email);
  const booking = await BookingService.getOne(bookingId);

  for (const b of bookings) {
    if(booking?.booking_id === b.booking_id) continue;
    console.log(b.end_time, booking!.start_time, b.end_time > booking!.start_time);
    console.log(booking!.end_time, b.start_time, booking!.end_time < b.start_time);
    if (b.end_time > booking!.start_time || booking!.end_time < b.start_time) {
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
  const schedule: ATrainerSchedule = {
    trainer_email: session.user.email,
    booking_id: bookingId,
  };
  await TrainerScheduleService.deleteOne(schedule);
  return res.status(HttpStatusCodes.OK).json({ message: 'Trainer left.' });
};


export default {
  getAll,
  getOne,
  getAllByBooking,
  enroll,
  leave,
  isEnrolled,
  conflicts,
} as const;