import { Owner } from "./services.types";

export type PaymentType = {
  _id: string;
  buyer: Owner;
  batch_id: string;
  checkout_items?: PaymentCheckoutItemType[];
  payment_method: string;
  payment_status: string;
  payment_id: string;
  total_amount: number;
  currency: string;
  callback_url: string;
  total_tax: number;
  total_shipping_fee: number;
  total_discount: number;
  createdAt: Date;
  id?: string;
};

export type PaymentCheckoutItemType = {
  _id: string;
  name: string;
  category: string;
  sub_category: string;
  description: string;
  owner?: Owner;
  order_quantity: number;
  total_price?: number;
};
