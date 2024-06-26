export interface FBooking {
  booking_id: number;
  type: BookingType;
  room_id: number;
  class_id?: number;
  room_name: string;
  class_name?: string;
  status: BookingStatus;
  description?: string;
  start_time: Date;
  end_time: Date;
  capacity: number;
  member_count: number;
  trainer_count: number;
}
export interface Booking {
  booking_id: number;
  type: BookingType;
  room_id?: number;
  class_id?: number;
  start_time: Date;
  end_time: Date;
  status: BookingStatus;
  capacity: number;
}
export interface Schedule {
  booking_id: number;
  start_time: Date;
  end_time: Date;
}
export enum BookingType {
  PERSONAL = 'personal',
  GROUP = 'group',
  OTHER = 'other',
}

export enum BookingStatus {
  SCHEDULED = 'scheduled',
  CANCELLED = 'cancelled',
}

export const bookingTypeOptions = [
  {
    value: BookingType.PERSONAL,
    name: 'Personal',
  },
  {
    value: BookingType.GROUP,
    name: 'Group',
  },
  {
    value: BookingType.OTHER,
    name: 'Other',
  },
]