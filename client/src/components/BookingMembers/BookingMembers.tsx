import { useEffect, useState } from "react";
import { Member } from "../../lib/models/Member";
import api from "../../lib/api";
import axios from "axios";
import Tile from "../Tile/Tile";

interface BookingMembersProps {
  booking_id: number;
}

const BookingMembers: React.FC<BookingMembersProps> = ({ booking_id }) => {
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    axios.get(api.path(`/members/booking/${booking_id}`)).then((res) => {
      setMembers(res.data.members);
    }).catch((err) => {
      console.error(err);
    });
  }, [booking_id]);

  return (
    <div className="booking-members">
      <h2>Members</h2>
      {members.map((m, i) => (
        <Tile id={`m-${i}`} key={i} title={`${m.first_name} ${m.last_name}`} description={""} href={`/members/${m.member_email}`}></Tile>
      ))}
    </div>
  );
}


export default BookingMembers;