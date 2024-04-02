export interface IRoutine {
  routine_id: number;
  member_email: string;
  description: string;
}

export interface ARoutine {
  member_email: string;
  description: string;
}
/**
 * Checks if the supplied argument is of Routine type
 * @param arg an object
 * @returns true if the object contains member keys and is of Routine type,
 * otherwise false.
 */
const isRoutine = (arg: unknown): boolean => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'routine_id' in arg &&
    'member_email' in arg &&
    'description' in arg
  );
};

/**
 * Checks if the supplied argument is of Routine type
 * @param arg an object
 * @returns true if the object contains member keys and is of Routine type,
 * otherwise false.
 */
const isARoutine = (arg: unknown): boolean => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'member_email' in arg &&
    'description' in arg
  );
};

export default {
  isRoutine,
  isARoutine,
} as const;