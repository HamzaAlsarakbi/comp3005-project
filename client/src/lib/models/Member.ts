import { Gender } from "../Gender";

export interface Member {
  member_email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  gender: Gender;
  birthday: Date;
  current_weight?: number;
  current_height?: number;
}