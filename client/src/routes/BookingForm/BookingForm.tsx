import { useEffect, useRef, useState } from 'react';
import ComboBox, { ComboBoxOption, ComboBoxRef } from '../../components/ComboBox/ComboBox';
import InputBox, { InputType } from '../../components/InputBox/InputBox';
import { BookingType, bookingTypeOptions } from '../../lib/models/Booking';
import './BookingForm.css';
import IconButton from '../../components/IconButton/IconButton';
import { Icons } from '../../lib/icons';
import Spacer from '../../components/Spacer/Spacer';
import { Color } from '../../lib/colors';
import api from '../../lib/api';
import axios from 'axios';
import { Room } from '../../lib/models/Room';
import { start } from 'repl';
import { Time } from '../../lib/models/Time';


const BookingForm = () => {
  const [classOptions, setClassOptions] = useState<ComboBoxOption[]>([]);
  const [roomOptions, setRoomOptions] = useState<ComboBoxOption[]>([]);
  const [bookingType, setBookingType] = useState<BookingType>(BookingType.PERSONAL);
  const classRef = useRef<ComboBoxRef>(null);
  const [from, setFrom] = useState<Time>();
  const [date, setDate] = useState<Date>();
  const [to, setTo] = useState<Time>();
  const [classId, setClassId] = useState<number>(-1);
  const [roomId, setRoomId] = useState<number>(-1);
  const fromRef = useRef<InputBox>(null);
  const toRef = useRef<InputBox>(null);
  const onRef = useRef<InputBox>(null);
  const roomRef = useRef<ComboBoxRef>(null);

  useEffect(() => {
    axios.get(api.path('/classes/all')).then((res) => {
      console.log(res.data.classes);
      const newClasses: ComboBoxOption[] = [{ name: 'No Class', value: '-1' }];
      for (const c of res.data.classes) {
        newClasses.push({
          name: c.name,
          value: '' + c.class_id
        })
      }
      console.log(newClasses);
      setClassOptions(newClasses);
    });
  }, []);

  useEffect(() => {
    if (bookingType === BookingType.OTHER) {
      classRef.current?.clearValue();
      setClassId(-1);
    }
  }, [classRef, bookingType]);
  useEffect(() => {
    fetchRooms();
  }, [from, to, date]);


  const bookingTypeHandler = (value: string) => {
    const newType = value as BookingType;
    setBookingType(newType);
  }
  const classHandler = (value: string) => { setClassId(Number(value)); }
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

  const verifyTime = (from: Time | undefined, to: Time | undefined) => {
    console.log('verify');
    if (!from || !to) return;
    if (from.hour > to.hour || (from.hour === to.hour && from.minute > to.minute - 30)) {
      toRef.current!.showText('Booking must be at least 30 minutes long', Color.Red);
    } else {
      toRef.current!.hideText();
    }
  }

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

  const addBookingHandler = () => {
    // make sure rooms are selected
    const classId = Number(classRef.current!.value() === '' ? -1 : classRef.current!.value());
    if (isNaN(classId)) {
      classRef.current!.setText('You must choose a class.', Color.Red);
      return;
    } else {
      roomRef.current!.hideText();
    }
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
        type: bookingType,
        room_id: roomId,
        class_id: classId < 0 ? null : classId,
        start_time: new Date(startTime.getTime() - (4 * 60 * 60 * 1000)),
        end_time: new Date(endTime.getTime() - (4 * 60 * 60 * 1000)),
      }
    };
    axios.post(api.path('/bookings/add'), body, { withCredentials: true }).then((res) => {
      window.location.replace('/bookings');
    })
  }

  return (
    <div className="new-booking-root">
      <Spacer />
      <div className="new-booking form">
        <h2 className="new-booking-container-item" id="new-booking">New Booking</h2>
        <ComboBox id="type" name="Booking Type" options={bookingTypeOptions} onChange={bookingTypeHandler} />
        {bookingType !== BookingType.OTHER &&
          <ComboBox ref={classRef} id="class" name="Class" options={classOptions} onChange={classHandler} />}
        <InputBox ref={onRef} id="on" inputType={InputType.DATE} placeholder="On" onInput={dateHandler} />
        <InputBox ref={fromRef} id="from" inputType={InputType.TIME} placeholder="From" onInput={fromHandler} />
        <InputBox ref={toRef} id="to" inputType={InputType.TIME} placeholder="To" onInput={toHandler} />
        <ComboBox ref={roomRef} id="room" name="Room" options={roomOptions} onChange={roomHandler} />
        <IconButton icon={Icons.TOAST_GREEN} id="submit" onClick={addBookingHandler}>Add</IconButton>
      </div>
    </div>
  );
};

export default BookingForm;