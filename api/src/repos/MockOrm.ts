
/**
 * THIS IS A TEMPORARY MOCK DATABASE UNTIL WE GET POSTGRES DATABASE SETUP
 */

import jsonfile from 'jsonfile';

import { IMember } from '@src/models/Member';

const DB_FILE_NAME = 'database.json';

interface IDb {
  members: IMember[];
}

/**
 * loads JSON "DB"
 * @returns database
 */
function openDb(): Promise<IDb> {
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<IDb>;
}

/**
 * saves the database
 * @param db database
 * @returns void
 */
function saveDb(db: IDb): Promise<void> {
  return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}

export default {
  openDb,
  saveDb,
} as const;
