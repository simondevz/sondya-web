import { ProductOrderType } from "./productOrders.types";
import { ServiceOrderType } from "./serviceOrders.types";
import { Owner } from "./services.types";
import { shippingDestinationType } from "./shippingdestination.types";

export type CheckoutType = {
  _id?: string;

  buyer?: Owner;

  checkout_items: ProductOrderType[];

  shipping_destination: shippingDestinationType;

  payment_method: string; // 'card' | 'mobile money'
  payment_status: string;
  total_amount: number;
  currency: string;

  order_status: string;
  redirect_url?: string;
  createdAt?: Date;

  total_tax: number;
  total_shipping_fee: number;
  total_discount: number;
};

export type GetProductOrderPayment = {
  _id: string;
  batch_id: string;
  buyer: Owner;
  checkout_items: ProductOrderType[];

  payment_method: string;
  payment_status: string;
  payment_id: string;
  callback_url: string;
  currency: string;
  total_amount: number;
  createdAt: Date;
};

export type GetProductOrder = {
  _id: string;
  buyer: Owner;
  checkout_items: ProductOrderType;
  order_status: string;
  payment_id: string;
  payment_status: string;
  batch_id: string;
  order_id: string;
  shipping_destination: shippingDestinationType;
  order_location: orderLocationType[];
  createdAt: Date;
};

export type AdminGetProductOrder = {
  count: number;
  orders: GetProductOrder[];
};

export type AdminGetServiceOrder = {
  count: number;
  orders: ServiceOrderType[];
};

export type orderLocationType = {
  country: string;
  state: string;
  city: string;
  zip_code: string;
  order_status: string;
};
