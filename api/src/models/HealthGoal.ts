export interface IHealthGoal {
  health_goal_id: number;
  member_email: string;
  description: string;
}

export interface AHealthGoal {
  member_email: string;
  description: string;
}
/**
 * Checks if the supplied argument is of HealGoal type
 * @param arg an object
 * @returns true if the object contains member keys and is of HealGoal type,
 * otherwise false.
 */
const isHealthGoal = (arg: unknown): boolean => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'health_goal_id' in arg &&
    'member_email' in arg &&
    'description' in arg
  );
};

/**
 * Checks if the supplied argument is of HealGoal type
 * @param arg an object
 * @returns true if the object contains member keys and is of HealGoal type,
 * otherwise false.
 */
const isAHealthGoal = (arg: unknown): boolean => {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'member_email' in arg &&
    'description' in arg
  );
};

export default {
  isHealthGoal,
  isAHealthGoal,
} as const;