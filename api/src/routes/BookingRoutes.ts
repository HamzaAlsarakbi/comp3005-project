import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import BookingService from '@src/services/BookingService';
import { ABooking, BookingType, UBooking } from '@src/models/Booking';

const getAll = async (_: IReq, res: IRes) => {
  const bookings = await BookingService.getAll();
  return res.status(HttpStatusCodes.OK).json({ bookings: bookings });
};

const getByClass = async (req: IReq, res: IRes) => {
  const classId = Number(req.params.id);
  if(isNaN(classId)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'class id must be a number.',
  });
  const bookings = await BookingService.getByClass(classId);
  return res.status(HttpStatusCodes.OK).json({ bookings: bookings });
};

const getByRoom = async (req: IReq, res: IRes) => {
  const roomId = Number(req.params.id);
  if(isNaN(roomId)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'room id must be a number.',
  });
  const bookings = await BookingService.getByRoom(roomId);
  return res.status(HttpStatusCodes.OK).json({ bookings: bookings });
};

const addOne = async (req: IReq<{ booking: ABooking }>, res: IRes) => {
  const { booking: booking } = req.body;
  if(booking.class_id && booking.type != BookingType.OTHER) {
    await BookingService.addClassBooking(booking);
  } else {
    console.log('adding regular aka other');
    await BookingService.addRegularBooking(booking);
  }
  res.status(HttpStatusCodes.OK).json({ message: 'Added booking.' });
};

const updateOne = async (req: IReq<{ booking: UBooking }>, res: IRes) => {
  const { booking: booking } = req.body;
  await BookingService.updateOne(booking);
  res.status(HttpStatusCodes.OK).json({ message: 'Updated booking.' });
};

const cancelOne = async (req: IReq, res: IRes) => {
  const bookingId = Number(req.params.id);
  if(isNaN(bookingId)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'booking id must be a number.',
  });
  await BookingService.cancelOne(bookingId);
  res.status(HttpStatusCodes.OK).json({ message: 'Cancelled booking.' });
};

const getOne = async (req: IReq, res: IRes) => {
  const bookingId = Number(req.params.id);
  if(isNaN(bookingId)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'booking id must be a number.',
  });
  const booking = await BookingService.getOne(bookingId);
  res.status(HttpStatusCodes.OK).json({ booking: booking });
};



export default {
  addOne,
  updateOne,
  cancelOne,
  getAll,
  getByClass,
  getByRoom,
  getOne,
} as const;