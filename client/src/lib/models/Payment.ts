export interface Payment {
  payment_id: number;
  member_email: string;
  amount: number;
  status: PaymentStatus;
  due_date: Date;
}
export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSED = 'processed',
  CANCELLED = 'cancelled',
}