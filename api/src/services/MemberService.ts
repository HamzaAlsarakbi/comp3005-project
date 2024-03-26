import MemberRepo from '@src/repos/MemberRepo';
import { IMember } from '@src/models/Member';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

export const MEMBER_NOT_FOUND_ERR = 'Member not found';

/**
 * Gets all members
 * @returns all members
 */
function getAll(): Promise<IMember[]> {
  return MemberRepo.getAll();
}

/**
 * Adds a member
 * @param member member
 * @returns void
 */
function addOne(member: IMember): Promise<void> {
  return MemberRepo.add(member);
}

/**
 * Updates a member
 * @param member member
 * @returns void
 */
async function updateOne(member: IMember): Promise<void> {
  const persists = await MemberRepo.persists(member.email);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      MEMBER_NOT_FOUND_ERR,
    );
  }
  return MemberRepo.update(member);
}

export default {
  getAll,
  addOne,
  updateOne,
} as const;
