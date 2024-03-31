export interface IAdmin {
  admin_email: string;
  first_name: string;
  last_name: string;
  password: string;
}


/**
 * Checks if the supplied argument is of Admin type
 * @param arg an object
 * @returns true if the object contains admin keys and is of admin type,
 * otherwise false.
 */
const isAdmin = (arg: unknown): boolean => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'admin_email' in arg &&
    'first_name' in arg &&
    'last_name' in arg &&
    'password' in arg
  );
};

export default {
  isAdmin,
} as const;