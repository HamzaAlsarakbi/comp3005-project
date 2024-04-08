export interface IFitnessAchievement {
    fitness_achievements_id: number;
    member_email: string;
    description: string;
}

export interface AFitnessAchievement {
member_email: string;
description: string;
}
/**
 * Checks if the supplied argument is of FitnessAchievement type
 * @param arg an object
 * @returns true if the object contains member keys and is of FitnessAchievement type,
 * otherwise false.
 */
const isFitnessAchievement = (arg: unknown): boolean => {
return (
    !!arg &&
    typeof arg === 'object' &&
    'fitness_achievements_id' in arg &&
    'member_email' in arg &&
    'description' in arg
);
};

/**
 * Checks if the supplied argument is of FitnessAchievement type
 * @param arg an object
 * @returns true if the object contains member keys and is of FitnessAchievement type,
 * otherwise false.
 */
const isAFitnessAchievement = (arg: unknown): boolean => {
return (
    !!arg &&
    typeof arg === 'object' &&
    'member_email' in arg &&
    'description' in arg
);
};

export default {
isFitnessAchievement,
isAFitnessAchievement,
} as const;