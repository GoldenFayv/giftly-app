export interface IPayment {
  reference: string;
  order_id: Id;
  provider: string;
  amount: number;
  currency: string;
  status: string;
  paid_at: string | null;
  authorization_url: string | null;
  access_code: string | null;
}