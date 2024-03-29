import { Gender } from './Gender';

export interface IMember {
  member_email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  birthday: Date;
  gender: Gender;
  current_weight: number;
  current_height: number;
}

export interface UMember {
  member_email: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  phone?: string;
  birthday?: Date;
  gender?: Gender;
  current_weight?: number;
  current_height?: number;
}

export interface AddMember {
  member_email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  birthday: Date;
  gender: Gender;
}


/**
 * Checks if the supplied argument is of Member type
 * @param arg an object
 * @returns true if the object contains member keys and is of member type,
 * otherwise false.
 */
const isMember = (arg: unknown): boolean => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'member_email' in arg &&
    'first_name' in arg &&
    'last_name' in arg &&
    'password' in arg &&
    'phone' in arg &&
    'birthday' in arg &&
    'gender' in arg
  );
}

export default {
  isMember: isMember,
};