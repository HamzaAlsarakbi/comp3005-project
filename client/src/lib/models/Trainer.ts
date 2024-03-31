import { Gender } from "../Gender";

export interface Trainer {
  trainer_email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  gender: Gender;
}