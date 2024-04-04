export interface IRoom {
  room_id: number;
  name: string;
}

export interface RoomBooking {
  booking_id: number;
  room_id: number;
  name: string;
  start_time: Date;
  end_time: Date;
}