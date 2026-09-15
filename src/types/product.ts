export interface IProduct {
  id: Id;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  price: {
    amount: number;
    currency: string;
  };
  type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}