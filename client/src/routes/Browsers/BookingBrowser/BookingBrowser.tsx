import { useEffect, useState } from "react";
import { TileProps } from "../../../components/Tile/Tile";
import axios from "axios";
import api from "../../../lib/api";
import ItemBrowser from "../../../components/ItemBrowser/ItemBrowser";
import Spacer from "../../../components/Spacer/Spacer";
import { FBooking } from "../../../lib/models/Booking";
import { UserRole, useSession } from "../../../components/SessionProvider/SessionProvider";



interface BookingBrowserProps {

}

const BookingBrowser: React.FC<BookingBrowserProps> = () => {
  const session = useSession();
  const [tiles, setTiles] = useState<TileProps[]>([]);
  useEffect(() => {
    document.title = 'Booking Browser';
    axios.get(api.path('/bookings/all-scheduled'), { withCredentials: true }).then((res) => {
      if (res.status === 200) {
        const bookings = res.data.bookings as FBooking[];
        // console.log(booking);
        const newTiles = []
        for(const b of bookings) {
          const spaceLeft = session?.role === UserRole.MEMBER ? (b.capacity-b.member_count-1) : (1-b.trainer_count);
          newTiles.push({
            id: 'e-'+b.booking_id,
            title: `${b.class_name ?? 'Regular Booking'} - ${b.room_name}`,
            description: `${b.description ?? ''}. ${spaceLeft} spots left`,
            href: '/bookings/'+b.booking_id,
          });
        }
        console.log(newTiles);
        setTiles(newTiles);
      }
    })

  }, []);
  return (
    <div className="booking-browser">
      <Spacer />
      <ItemBrowser title="Booking" tiles={tiles} />
    </div>
  )
}

export default BookingBrowser;