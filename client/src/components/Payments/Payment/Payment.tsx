import axios from "axios";
import { Icons } from "../../../lib/icons"
import IconButton from "../../IconButton/IconButton"
import api from "../../../lib/api";
import InputBox, { InputPolicy, InputType } from "../../InputBox/InputBox";
import { useEffect, useRef } from "react";
import { Payment, PaymentStatus } from "../../../lib/models/Payment";
import { UserRole, useSession } from "../../SessionProvider/SessionProvider";

interface PaymentProps {
  payment: Payment;
  id: number;
  onUpdate(): void;
}


const PaymentC: React.FC<PaymentProps> = ({ payment, id, onUpdate }) => {
  const session = useSession();
  useEffect(() => {

  }, [payment, id]);
  const cancelHandler = () => {
    axios.put(api.path('/payments/cancel/' + payment.payment_id), { withCredentials: true }).then((res) => {
      onUpdate();
    });
  }

  const payHandler = () => {
    axios.put(api.path('/payments/process/' + payment.payment_id), { withCredentials: true }).then((res) => {
      onUpdate();
    });
  }
  return (
    <div className="payment" key={id} id={`payment-${id}`}>
      <h3>Bill {id + 1} - {payment.status}</h3>
      <p className="bill-item bill-amount" id={`bill-${id}`}>${payment.amount / 100}</p>
      <p className="bill-item bill-due" id={`bill-${id}`}>Due {payment.due_date.toISOString().split('T')[0]}</p>
      {payment.status === PaymentStatus.PROCESSED || payment.status === PaymentStatus.CANCELLED || session?.role === UserRole.ADMIN ? <></> :
        <IconButton icon={Icons.TOAST_ORANGE} id={`pay-${id}`} onClick={payHandler}>Pay</IconButton>
      }
      {payment.status === PaymentStatus.PROCESSED || payment.status === PaymentStatus.CANCELLED || session?.role !== UserRole.ADMIN ? <></> :
        <IconButton icon={Icons.TOAST_ORANGE} id={`pay-${id}`} onClick={cancelHandler}>Cancel</IconButton>
      }
    </div>
  )
}

export default PaymentC;