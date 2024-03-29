import { SessionData } from 'express-session';
import { IMember } from './Member';
import { randomInt } from 'crypto';
import { IAdmin } from './Admin';
import { ITrainer } from './Trainer';

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
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  TRAINER = 'TRAINER'
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
 * @param u member
 * @returns user session
 */
const fromMember = (u: IMember): UserSession => {
  return new_(UserRole.MEMBER, u.member_email, u.first_name, u.last_name);
};

/**
 * Creates a user session from an admin's data
 * @param u admin
 * @returns user session
 */
const fromAdmin = (m: IAdmin): UserSession => {
  return new_(UserRole.ADMIN, m.admin_email, m.first_name, m.last_name);
};

/**
 * Creates a user session from an trainer's data
 * @param u trainer
 * @returns user session
 */
const fromTrainer = (m: ITrainer): UserSession => {
  return new_(UserRole.TRAINER, m.trainer_email, m.first_name, m.last_name);
};


export default {
  fromMember: fromMember,
  fromAdmin: fromAdmin,
  fromTrainer: fromTrainer,
} as const;