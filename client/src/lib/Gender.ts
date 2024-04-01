import { ComboBoxOption } from "../components/ComboBox/ComboBox";

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export const genderOptions: ComboBoxOption[] = [
  { value: 'male', name: 'Male' },
  { value: 'female', name: 'Female' },
];