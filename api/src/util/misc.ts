/**
 * Miscellaneous shared functions go here.
 */


/**
 * Get a random number between 1 and 1,000,000,000,000
 */
export function getRandomInt(): number {
  return Math.floor(Math.random() * 1_000_000_000_000);
}

/**
 * Wait for a certain number of milliseconds.
 */
export function tick(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}


export function toSQLDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const toSQLTimestamp = (timestamp: Date): string => {
  return timestamp.toISOString().slice(0, 19).replace('T', ' ');
};

export const getTime = (hour: number, minute: number): Date => {
  const currentDate = new Date();
  currentDate.setHours(hour, minute, 0, 0);
  currentDate.setDate(currentDate.getDate() + 7);
  return currentDate;
}