import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import BookingService from '@src/services/BookingService';
import { ABooking } from '@src/models/Booking';

const getAll = async (_: IReq, res: IRes) => {
  const bookings = await BookingService.getAll();
  return res.status(HttpStatusCodes.OK).json({ bookings: bookings });
};


const getAllClass = async (req: IReq, res: IRes) => {
  console.log(req.params);
  const classId = Number(req.params.id);
  if(isNaN(classId)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'class_id must be a number.',
  });
  const bookings = await BookingService.getAllClass(classId);
  return res.status(HttpStatusCodes.OK).json({ bookings: bookings });
};

const addOne = async (req: IReq<{ booking: ABooking }>, res: IRes) => {
  const { booking: booking } = req.body;
  if(booking.class_id) {
    await BookingService.addClassBooking(booking);
  } else {
    await BookingService.addClassBooking(booking);
  }
  res.status(HttpStatusCodes.OK).json({ message: 'Added booking.' });
};

const updateOne = async (req: IReq<{ booking: ABooking }>, res: IRes) => {
  const 
  const { booking: booking } = req.body;
  if(booking.class_id) {
    await BookingService.addClassBooking(booking);
  } else {
    await BookingService.addClassBooking(booking);
  }
  res.status(HttpStatusCodes.OK).json({ message: 'Added booking.' });
};




export default {
  getAll,
  getAllClass,
  addOne,
} as const;