import { postgresQuery } from '@src/db/postgres-helpers';
import { APayment, IPayment, PaymentStatus } from '@src/models/Payment';
import logger from 'jet-logger';

/**
 * gets all health goals of a specific member
 * @returns all health goals of a specific member
 */
const getAll = async (member_email: string): Promise<IPayment[]> => {
  const payments = await postgresQuery<IPayment>(
    `select * from payments where member_email='${member_email}'`,
  );
  return payments;
};

/**
 * Adds a payment
 * @param payment payment
 */
const addOne = async (payment: APayment): Promise<void> => {
  await postgresQuery<IPayment>(
    `insert into payments (member_email,amount)
    values ('${payment.member_email}', '${payment.amount}')`,
  );
  logger.info(`Adding a health goal for ${payment.member_email}`);
};


/**
 * Processes a payment
 * @param id payment id
 */
const processOne = async (id: number): Promise<void> => {
  await postgresQuery<IPayment>(
    `update payments
      set status='${PaymentStatus.PROCESSED}'
      where payment_id=${id};`,
  );
};

/**
 * Cancels a payment
 * @param id payment id
 */
const cancelOne = async (id: number): Promise<void> => {
  await postgresQuery<IPayment>(
    `update payments
      set status='${PaymentStatus.CANCELLED}'
      where payment_id=${id};`,
  );
};


export default {
  getAll,
  addOne,
  cancelOne,
  processOne,
} as const;