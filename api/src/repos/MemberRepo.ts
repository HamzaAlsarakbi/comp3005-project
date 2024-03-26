import { IMember } from '@src/models/Member';
import orm from './MockOrm';

/**
 * Gets one member
 * @param email member's email
 * @returns member if a member with the email exists, otherwise false.
 */
async function getOne(email: string): Promise<IMember | null> {
  const db = await orm.openDb();
  for (const member of db.members) {
    if (member.email === email) {
      return member;
    }
  }
  return null;
}

/**
 * Checks if a member with the given email exists.
 * @param email email
 * @returns true if the member exists, otherwise false.
 */
async function exists(email: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const member of db.members) {
    if (member.email === email) {
      return true;
    }
  }
  return false;
}

/**
 * Gets all members
 * @returns all members
 */
async function getAll(): Promise<IMember[]> {
  const db = await orm.openDb();
  return db.members;
}

/**
 * Adds a member
 * @param member member
 * @returns void
 */
async function add(member: IMember): Promise<void> {
  const db = await orm.openDb();
  db.members.push(member);
  return orm.saveDb(db);
}

/**
 * Updates a member
 * @param member member
 * @returns void
 */
async function update(member: IMember): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.members.length; i++) {
    if (db.members[i].email === member.email) {
      db.members[i] = member;
      return orm.saveDb(db);
    }
  }
}

/**
 * Deletes a member
 * @param email email
 * @returns void
 */
async function delete_(email: string): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.members.length; i++) {
    if (db.members[i].email === email) {
      db.members.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

export default {
  getOne,
  persists: exists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
