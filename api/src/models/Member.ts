import { Gender } from './Gender';

/**
 * Member's general attributes
 */
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

/**
 * Optional attributes to update a member's details
 */
export interface UMember {
  [key: string]: unknown;
  member_email: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  phone?: string;
  current_weight?: number;
  current_height?: number;
}

/**
 * Minimal attributes needed to add a new member
 */
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
    'phone' in arg
  );
};

/**
 * Checks if the supplied argument is of UMember type
 * @param arg an object
 * @returns true if the object contains member keys and is of member type,
 * otherwise false.
 */
const isUMember = (arg: unknown): boolean => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'member_email' in arg &&
    (
      'member_email' in arg ||
      'first_name' in arg ||
      'last_name' in arg ||
      'password' in arg ||
      'phone' in arg
    )
  );
};


export default {
  isMember,
  isUMember,
} as const;