import { IMember } from '@src/models/Member';
import orm from './MockOrm';

/**
 * Gets one member
 * @param member_email member's email
 * @returns member if a member with the member_email exists, otherwise false.
 */
async function getOne(member_email: string): Promise<IMember | null> {
  const db = await orm.openDb();
  for (const member of db.members) {
    if (member.member_email === member_email) {
      return member;
    }
  }
  return null;
}

/**
 * Checks if a member with the given member_email exists.
 * @param member_email email
 * @returns true if the member exists, otherwise false.
 */
async function exists(member_email: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const member of db.members) {
    if (member.member_email === member_email) {
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
    if (db.members[i].member_email === member.member_email) {
      db.members[i] = member;
      return orm.saveDb(db);
    }
  }
}

/**
 * Deletes a member
 * @param member_email member_email
 * @returns void
 */
async function delete_(member_email: string): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.members.length; i++) {
    if (db.members[i].member_email === member_email) {
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
