import { useEffect, useRef, useState } from "react";
import InputBox, { InputPolicy, InputType } from "../InputBox/InputBox";
import IconButton from "../IconButton/IconButton";
import { Icons } from "../../lib/icons";
import api from "../../lib/api";
import axios from "axios";
import { Payment } from "../../lib/models/Payment";
import { UserRole, useSession } from "../SessionProvider/SessionProvider";
import PaymentC from "./Payment/Payment";

interface PaymentProps {
  member_email: string;
}

const Payments: React.FC<PaymentProps> = ({ member_email }) => {
  const session = useSession();
  const amountRef = useRef<InputBox>(null);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = () => {
    axios.get(api.path('/payments/all/' + member_email), { withCredentials: true }).then((res) => {
      const payments: Payment[] = res.data;
      for (const p of payments) p.due_date = new Date(p.due_date);
      console.log(payments);
      payments.sort((a, b) => b.payment_id - a.payment_id);
      setPayments([]);
      setPayments(payments);
      // rebuild ui here
      console.log(payments);
    });
  }
  const addHandler = () => {
    if (amountRef.current!.hasError()) {
      amountRef.current!.emphasizeText();
      return;
    }
    const data = {
      payment: {
        member_email: member_email,
        amount: Math.round(Number(amountRef.current!.value()) * 100),
      }
    }
    axios.post(api.path('/payments/add'), data, { withCredentials: true }).then((res) => {
      fetchPayments();
    });
  };



  return (
    <div className="payments">
      {session?.role === UserRole.ADMIN ?
        <div className="new-payment">
          <h2>New Bill</h2>
          <InputBox ref={amountRef} id="description" inputType={InputType.INPUT} inputPolicy={InputPolicy.NUMBERS} placeholder="Amount $" />
          <IconButton icon={Icons.TOAST_GREEN} id="update" onClick={addHandler}>Add</IconButton>
        </div> : <></>}
      <h2>{session?.role === UserRole.MEMBER ? 'My' : `Member's`} Bills</h2>
      {payments.length > 0 ?
        <div className="current-payments">
          {payments.map((payment) => (
            <PaymentC payment={payment} id={payment.payment_id} key={payment.payment_id} onUpdate={fetchPayments} />
          ))}
        </div> :
        <p>{session?.role === UserRole.MEMBER ? 'You have' : `Member has`} no bills</p>
      }
    </div>
  );
};

export default Payments;