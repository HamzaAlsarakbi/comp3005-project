/**
 * Clamps a number between a min and max
 * @param value the number to be clamped
 * @param min the minimum value
 * @param max the maximum value
 * @returns the clamped value
 */
const clamp = (value: number, min: number, max: number) => {
  return value < min ? min : value > max ? max : value;
}

export default clamp;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)/;
export const PHONE_NUMBER_REGEX = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
export const WORDS_REGEX = /\p{L}/u;