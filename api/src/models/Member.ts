import { Gender } from './misc';

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an ' + 
  'object with the appropriate member keys.';

export interface IMember {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: Gender;
}

/**
 * Creates a new member
 * @param first_name first name
 * @param last_name last name
 * @param email email
 * @param password password
 * @param phone phone
 * @param birthday birthday
 * @param gender gender
 * @returns the member
 */
function new_(
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  phone: string,
  birthday: string,
  gender: Gender,

): IMember {
  return {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    phone: phone,
    birthday: birthday,
    gender: gender,
  };
}

/**
 * Parses JSON into member object
 * @param param member object
 * @returns the member object
 */
function from(param: object): IMember {
  // Check is user
  if (!isMember(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  // Get user instance
  const p = param as IMember;
  return new_(p.first_name, p.last_name, p.email,
    p.password, p.phone, p.birthday, p.gender);
}

/**
 * Checks if the supplied argument is of Member type
 * @param arg an object
 * @returns true if the object contains member keys and is of member type,
 * otherwise false.
 */
function isMember(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'first_name' in arg &&
    'last_name' in arg &&
    'email' in arg &&
    'password' in arg &&
    'phone' in arg &&
    'birthday' in arg &&
    'gender' in arg
  );
}

export default {
  new: new_,
  from,
  isMember: isMember,
} as const;
