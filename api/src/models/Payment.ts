export interface IPayment {
  payment_id: number;
  member_email: string;
  amount: number;
  status: PaymentStatus;
  due_date: Date;
}

export interface APayment {
  member_email: string;
  amount: number;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSED = 'processed',
  CANCELLED = 'cancelled',
}