import { useEffect, useRef, useState } from "react";
import InputBox, { InputType } from "../InputBox/InputBox";
import ComboBox, { ComboBoxOption, ComboBoxRef } from "../ComboBox/ComboBox";
import { Time } from "../../lib/models/Time";
import { Color } from "../../lib/colors";
import axios from "axios";
import api from "../../lib/api";
import { Room } from "../../lib/models/Room";
import IconButton from "../IconButton/IconButton";
import { Icons } from "../../lib/icons";

interface RescheduleBookingProps {
  booking_id: number;
}

const RescheduleBooking: React.FC<RescheduleBookingProps> = ({ booking_id }) => {
  const fromRef = useRef<InputBox>(null);
  const toRef = useRef<InputBox>(null);
  const onRef = useRef<InputBox>(null);
  const roomRef = useRef<ComboBoxRef>(null);
  const [roomId, setRoomId] = useState<number>(-1);
  const [from, setFrom] = useState<Time>();
  const [date, setDate] = useState<Date>();
  const [to, setTo] = useState<Time>();

  useEffect(() => {
    fetchRooms();
  }, [from, to, date]);

  const fetchRooms = () => {
    if (onRef.current!.hasError() || !date) return;
    if (fromRef.current!.hasError() || !from) return;
    if (toRef.current!.hasError() || !to) return;
    // clear room option
    setRoomId(-1);
    roomRef.current!.clearValue();

    // get new rooms
    const startTime = new Date(date!.toString());
    startTime.setHours(from!.hour, from!.minute, 0, 0);
    const endTime = new Date(date!.toString());
    endTime.setHours(to!.hour, to!.minute, 0, 0);
    const data = {
      period: {
        start_time: startTime,
        end_time: endTime,
      }
    };
    axios.put(api.path('/rooms/available'), data).then((res) => {
      setRoomOptions(res.data.rooms.map((e: Room) => ({
        value: e.room_id,
        name: e.name,
      })) as ComboBoxOption[]);
    });
  }

  const verifyTime = (from: Time | undefined, to: Time | undefined) => {
    console.log('verify');
    if (!from || !to) return;
    if (from.hour > to.hour || (from.hour === to.hour && from.minute > to.minute - 30)) {
      toRef.current!.showText('Booking must be at least 30 minutes long', Color.Red);
    } else {
      toRef.current!.hideText();
    }
  }

  const [roomOptions, setRoomOptions] = useState<ComboBoxOption[]>([]);
  const roomHandler = (value: string) => { setRoomId(Number(value)); }
  const fromHandler = (value: string) => {
    let seg = value.split(':');
    const newFrom = { hour: Number(seg[0]), minute: Number(seg[1]) };
    setFrom(newFrom);
    verifyTime(newFrom, to);
  }
  const toHandler = (value: string) => {
    let seg = value.split(':');
    const newTo = { hour: Number(seg[0]), minute: Number(seg[1]) };
    setTo(newTo);
    verifyTime(from, newTo);
  }
  const dateHandler = (value: string) => {
    const temp = new Date(value);
    // adjust date according to timezone
    const newDate = new Date(temp.getTime() + (temp.getTimezoneOffset() * 60000));
    // verify new date
    const tmr = new Date();
    tmr.setDate(tmr.getDate());
    if (newDate < tmr) {
      onRef.current!.showText("Date must be from tomorrow onwards", Color.Red);
    } else {
      onRef.current!.hideText();
    }
    setDate(newDate);
  }

  const updateBookingHandler = () => {
    const roomId = Number(roomRef.current!.value() === '' ? -1 : roomRef.current!.value());
    if (isNaN(roomId) || roomId < 0) {
      roomRef.current!.setText('You must choose a room.', Color.Red);
      return;
    } else {
      roomRef.current!.hideText();
    }
    if (!date || onRef.current!.hasError()) {
      onRef.current!.emphasizeText();
      return;
    }

    if (!from || fromRef.current!.hasError()) {
      fromRef.current!.emphasizeText();
      return;
    }
    if (!to || toRef.current!.hasError()) {
      toRef.current!.emphasizeText();
      return;
    }
    const startTime = new Date(date!.toString());
    startTime.setHours(from!.hour, from!.minute, 0, 0);
    const endTime = new Date(date!.toString());
    endTime.setHours(to!.hour, to!.minute, 0, 0);
    const body = {
      booking: {
        booking_id: booking_id,
        room_id: roomId,
        start_time: new Date(startTime.getTime() - (4 * 60 * 60 * 1000)),
        end_time: new Date(endTime.getTime() - (4 * 60 * 60 * 1000)),
      }
    };
    axios.put(api.path('/bookings/update'), body, { withCredentials: true }).then((res) => {
      window.location.reload();
    })
  }
  return (
    <div className="reschedule-booking">
      <InputBox ref={onRef} id="on" inputType={InputType.DATE} placeholder="On" onInput={dateHandler} />
      <InputBox ref={fromRef} id="from" inputType={InputType.TIME} placeholder="From" onInput={fromHandler} />
      <InputBox ref={toRef} id="to" inputType={InputType.TIME} placeholder="To" onInput={toHandler} />
      <ComboBox ref={roomRef} id="room" name="Room" options={roomOptions} onChange={roomHandler} />
      <IconButton icon={Icons.TOAST_GREEN} id="submit" onClick={updateBookingHandler}>Reschedule</IconButton>
    </div>
  );
}

export default RescheduleBooking;