import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './../Details.css';
import axios from "axios";
import api from "../../../lib/api";
import { Booking, FBooking } from "../../../lib/models/Booking";
import Spacer from "../../../components/Spacer/Spacer";
import { Icons } from "../../../lib/icons";
import { UserRole, useSession } from "../../../components/SessionProvider/SessionProvider";
import Tabs from "../../../components/Tabs/Tabs";
import Tab from "../../../components/Tabs/Tab";
import IconButton from "../../../components/IconButton/IconButton";
import BookingMembers from "../../../components/BookingMembers/BookingMembers";
import Tile from "../../../components/Tile/Tile";


const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<FBooking | null>(null);
  const [enrolled, setEnrolled] = useState<boolean>(false);
  const [spacesLeft, setSpacesLeft] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [conflictWith, setConflictsWith] = useState<Booking | null>(null);
  const session = useSession();
  useEffect(() => {
    document.title = 'Booking Profile';
    fetchBookingDetails();
  }, [id]);

  const enrollHandler = () => {
    axios.put(api.path(`/members/booking/enroll/${id}`), {}, { withCredentials: true }).then((res) => {
      fetchBookingDetails();
    }).catch((err) => {
      console.error(err);
    });
  };
  const leaveHandler = () => {
    axios.put(api.path(`/members/booking/leave/${id}`), {}, { withCredentials: true }).then((res) => {
      fetchBookingDetails();
    }).catch((err) => {
      console.error(err);
    });
  };

  const fetchBookingDetails = () => {
    axios.get(api.path(`/bookings/${id}`)).then((res) => {
      setBooking(res.data.booking);
      const b = res.data.booking;
      if (res.data.booking)
        setSpacesLeft(session?.role === UserRole.MEMBER ? (b!.capacity - b!.member_count - 1) : (1 - b!.trainer_count));
      document.title = b?.class_name ?? 'Unknown Booking';
      console.log('updated');
    }).catch((err) => {
      console.error(err);
    });
    axios.get(api.path(`/members/booking/is-enrolled/${id}`), { withCredentials: true }).then((res) => {
      const ie = res.data.isEnrolled;
      setEnrolled(ie);
      if (!ie) {
        axios.get(api.path(`/members/booking/conflicts/${id}`), { withCredentials: true }).then((res) => {
          console.log('conflict result');
          setConflictsWith(res.data.conflictsWith as Booking);
        }).catch((err) => {
          console.error(err);
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  }
  const cancelHandler = () => {
    console.error('TODO: cancelHandler()');
  }

  return (
    <>
      <Spacer />
      <div className="details-container" >
        <div className="details-overview">
          <img className="overview-item" id="details-icon" src={Icons.MEMBER} alt={booking?.class_name ?? "Booking Picture"} />
          <div className="overview-item" id="details-title">{booking?.class_name ?? 'Regular Booking'} - {booking?.room_name}</div>
        </div>
        <div className="details-content">
          <div className="content-item" id="details-title">Details</div>
          <Tabs id="booking-details">
            <Tab title="Summary">
              <div className="content-item" id="details-body">
                {booking?.class_id &&
                  <div className="details-body-item" id="booking-room">
                    Class: <Link to={`/rooms/${booking?.class_id}`}>{booking?.class_name}</Link>
                  </div>
                }
                <div className="details-body-item" id="booking-room" >
                  Room: <Link to={`/rooms/${booking?.room_id}`}>{booking?.room_name}</Link>
                </div>
                {booking?.start_time &&
                  <div className="details-body-item" id="booking-start">Start: {booking?.start_time.toString()}</div>
                }
                {booking?.end_time &&
                  <div className="details-body-item" id="booking-end">End: {booking?.end_time.toString()}</div>
                }
                <div className="details-body-item" id="booking-spaces-left">Spots left: {spacesLeft}</div>
                <p>{typeof conflictWith}</p>
                {enrolled ?
                  <IconButton icon={Icons.TOAST_RED} id="leave" onClick={leaveHandler}>Leave</IconButton> :
                  conflictWith ?
                    <>
                      <h2>Booking Issue</h2>
                      <Tile
                        id="conflicts-with"
                        title={"Conflicts with a booking"}
                        description=""
                        href={`/bookings/${conflictWith.booking_id}`} />
                    </>
                    :
                    <IconButton icon={Icons.TOAST_GREEN} id="enroll" onClick={enrollHandler}>Enroll</IconButton>
                }

                {session?.role === UserRole.ADMIN &&
                  <IconButton icon={Icons.TOAST_RED} id="leave" onClick={cancelHandler}>Cancel</IconButton>
                }
              </div>
            </Tab>
            {booking &&
              <Tab title="Members">
                <BookingMembers booking_id={booking?.booking_id} />
              </Tab>
            }
            {booking &&
              <Tab title="Trainer">
                <BookingMembers booking_id={booking?.booking_id} />
              </Tab>
            }
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default BookingDetails;