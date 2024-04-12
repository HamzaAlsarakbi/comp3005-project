export enum BookingType {
  PERSONAL = 'personal',
  GROUP = 'group',
  OTHER = 'other',
}

export enum BookingStatus {
  SCHEDULED = 'scheduled',
  CANCELLED = 'cancelled',
}

export interface IBooking {
  booking_id: number;
  type: BookingType;
  room_id: number;
  class_id?: number;
  start_time: Date;
  end_time: Date;
  status: BookingStatus;
  capacity: number;
}

/**
 * Full booking
 */
export interface FBooking {
  booking_id: number;
  type: BookingType;
  room_id: number;
  class_id: number;
  room_name: string;
  class_name: string;
  status: BookingStatus,
  description: string;
  capacity: number;
  start_time: Date;
  end_time: Date;
  member_count: number;
  trainer_count: number;
}

export interface ABooking {
  type: BookingType;
  room_id: number;
  class_id?: number;
  start_time: Date;
  end_time: Date;
}
export interface Schedule {
  booking_id: number;
  start_time: Date;
  end_time: Date;
}
export interface UBooking {
  booking_id: number;
  start_time: Date;
  end_time: Date;
  room_id: number;
}

export interface Period {
  start_time: Date;
  end_time: Date;
}