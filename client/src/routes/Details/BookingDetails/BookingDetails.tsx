import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './../Details.css';
import axios from "axios";
import api from "../../../lib/api";
import { Booking, BookingStatus, BookingType, FBooking } from "../../../lib/models/Booking";
import Spacer from "../../../components/Spacer/Spacer";
import { Icons } from "../../../lib/icons";
import { UserRole, useSession } from "../../../components/SessionProvider/SessionProvider";
import Tabs from "../../../components/Tabs/Tabs";
import Tab from "../../../components/Tabs/Tab";
import IconButton from "../../../components/IconButton/IconButton";
import BookingMembers from "../../../components/BookingMembers/BookingMembers";
import Tile from "../../../components/Tile/Tile";
import BookingTrainers from "../../../components/BookingTrainers/BookingTrainers";
import { CANCELLED } from "dns";
import { formatDate, formatDateTime } from "../../../lib/utils";


const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<FBooking | null>(null);
  const [enrolled, setEnrolled] = useState<boolean>(false);
  const [spacesLeft, setSpacesLeft] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [conflictWith, setConflictsWith] = useState<Booking | null>(null);
  const session = useSession();
  const participantPathname = session?.role.toLocaleLowerCase() + 's';
  useEffect(() => {
    document.title = 'Booking Profile';
    fetchBookingDetails();
  }, [id]);

  const enrollHandler = () => {
    axios.put(api.path(`/${participantPathname}/booking/enroll/${id}`), {}, { withCredentials: true }).then((res) => {
      fetchBookingDetails();
    }).catch((err) => {
      console.error(err);
    });
  };
  const leaveHandler = () => {
    axios.put(api.path(`/${participantPathname}/booking/leave/${id}`), {}, { withCredentials: true }).then((res) => {
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
    }).catch((err) => {
      console.error(err);
    });
    axios.get(api.path(`/${participantPathname}/booking/is-enrolled/${id}`), { withCredentials: true }).then((res) => {
      const ie = res.data.isEnrolled;
      setEnrolled(ie);
      if (!ie) {
        axios.get(api.path(`/${participantPathname}/booking/conflicts/${id}`), { withCredentials: true }).then((res) => {
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
    axios.put(api.path(`/bookings/cancel/${id}`), {}, { withCredentials: true }).then((res) => {
      fetchBookingDetails();
    });
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
                  <div className="details-body-item" id="booking-class">
                    <h4 className="details-body-item-header" id="booking-class">Class</h4>
                    <p className="details-body-item-body" id="booking-class">{booking?.class_name}</p>
                  </div>
                }
                <div className="details-body-item" id="booking-room">
                  <h4 className="details-body-item-header" id="booking-room">Room</h4>
                  <p className="details-body-item-body" id="booking-room">{booking?.room_name}</p>
                </div>
                {booking?.start_time &&
                  <div className="details-body-item" id="booking-start">
                    <h4 className="details-body-item-header" id="booking-start">Start</h4>
                    <p className="details-body-item-body" id="booking-start">{formatDateTime(booking?.start_time)}</p>
                  </div>
                }
                {booking?.end_time &&
                  <div className="details-body-item" id="booking-end">
                    <h4 className="details-body-item-header" id="booking-end">End</h4>
                    <p className="details-body-item-body" id="booking-end">{formatDateTime(booking?.end_time)}</p>
                  </div>
                }
                <div className="details-body-item" id="booking-spaces-left">
                  <h4 className="details-body-item-header" id="booking-spaces-left">Spots Left</h4>
                  <p className="details-body-item-body" id="booking-spaces-left">{spacesLeft}</p>
                </div>
                {booking?.status === BookingStatus.CANCELLED ?
                  <h2 className="details-body-item" id="booking-spaces-left">Cancelled</h2>
                  : <>
                    {session?.role === UserRole.ADMIN ?
                      <IconButton icon={Icons.TOAST_RED} id="cancel" onClick={cancelHandler}>Cancel</IconButton>
                      : enrolled ?
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
                  </>
                }

              </div>
            </Tab>
            {booking && booking.member_count > 0 &&
              <Tab title="Members">
                <BookingMembers booking_id={booking?.booking_id} />
              </Tab>
            }
            {booking && booking.trainer_count > 0 &&
              <Tab title="Trainer">
                <BookingTrainers booking_id={booking?.booking_id} />
              </Tab>
            }
            {enrolled && booking?.type === BookingType.PERSONAL && booking.trainer_count > 0 &&
              <Tab title="Reschedule">
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