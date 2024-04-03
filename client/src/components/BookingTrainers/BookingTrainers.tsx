import { useEffect, useState } from "react";
import api from "../../lib/api";
import axios from "axios";
import Tile from "../Tile/Tile";
import { Trainer } from "../../lib/models/Trainer";

interface BookingTrainersProps {
  booking_id: number;
}

const BookingTrainers: React.FC<BookingTrainersProps> = ({ booking_id }) => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  useEffect(() => {
    axios.get(api.path(`/trainers/booking/${booking_id}`)).then((res) => {
      setTrainers(res.data.trainers);
    }).catch((err) => {
      console.error(err);
    });
  }, [booking_id]);

  return (
    <div className="booking-trainers">
      <h2>Trainers</h2>
      {trainers.map((m, i) => (
        <Tile id={`m-${i}`} key={i} title={`${m.first_name} ${m.last_name}`} description={""} href={`/trainers/${m.trainer_email}`}></Tile>
      ))}
    </div>
  );
}


export default BookingTrainers;