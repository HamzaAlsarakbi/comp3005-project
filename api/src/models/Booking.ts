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
  start_time: Date;
  end_time: Date;
  status: BookingStatus;
  capacity: number;
}