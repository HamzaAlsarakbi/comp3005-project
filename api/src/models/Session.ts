import { SessionData } from 'express-session';
import { IMember } from './Member';
import { randomInt } from 'crypto';

export interface UserSession {
  id: number;
  role: UserRole;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ISessionUser extends SessionData {
  user?: UserSession;
}

export enum UserRole {
  ADMIN,
  MEMBER,
  TRAINER
}

const new_ = (
  role: UserRole,
  email: string,
  first_name: string,
  last_name: string
): UserSession => {
  return {
    id: randomInt(256000),
    role: role,
    email: email,
    first_name: first_name,
    last_name: last_name,
  };
};

/**
 * Creates a user session from a member's data
 * @param m member
 * @returns user session
 */
const memberSessionFrom = (m: IMember): UserSession => {
  return new_(UserRole.MEMBER, m.email, m.first_name, m.last_name);
};


export default {
  memberSessionFrom: memberSessionFrom,
} as const;