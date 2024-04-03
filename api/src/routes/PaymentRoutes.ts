import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import PaymentService from '@src/services/PaymentService';
import { IReq, IRes } from './types/express/misc';
import { APayment } from '@src/models/Payment';


const getAll = async (req: IReq, res: IRes) => {
  const email = req.params.member_email;
  res.status(HttpStatusCodes.OK).json(await PaymentService.getAll(email));
};

const addOne = async (req: IReq<{ payment: APayment }>, res: IRes) => {
  const { payment: payment } = req.body;
  await PaymentService.addOne(payment);
  res.status(HttpStatusCodes.OK).json({ message: 'Added payment' });
};

const processOne = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id);
  if(isNaN(id)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'Payment ID must be a number.',
  });
  await PaymentService.processOne(id);
  res.status(HttpStatusCodes.OK).json({ message: 'Processed payment.' });
};

const cancelOne = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id);
  if(isNaN(id)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'Payment ID must be a number.',
  });
  await PaymentService.cancelOne(id);
  res.status(HttpStatusCodes.OK).json({ message: 'Cancelled payment.' });
};

export default {
  getAll,
  addOne,
  processOne,
  cancelOne,
} as const;