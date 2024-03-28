import { randomInt } from 'crypto';

/**
 * Generates a random date between 1950 and 2005 inclusive
 * @returns random date
 */
export const randomDate = (): Date => {
  const year = randomInt(1950, 2006);
  const month = randomInt(0, 11);
  const day = randomInt(1, new Date(year, month + 1, 0).getDate());
  return new Date(year, month, day);
};
