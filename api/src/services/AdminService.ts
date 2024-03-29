import { postgresQuery } from '@src/db/postgres-helpers';
import { IAdmin } from '@src/models/Admin';

/**
 * Gets one admin using the email
 * @param email email address of member
 * @returns the admin if there is one with the provided email, otherwise null.
 */
const getOne = async (email: string): Promise<IAdmin | null> => {
  const admin = await postgresQuery<IAdmin>(
    `select * from admins where admin_email='${email}'`);

  return admin.length == 0 ? null : admin[0];
};



export default {
  getOne,
};