import { ProductOrderType } from "./productOrders.types";
import { Owner } from "./services.types";
import { shippingDestinationType } from "./shippingdestination.types";

export type CheckoutType = {
  _id?: string;

  checkoutItems: ProductOrderType[];
  subTotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  totalAmount: number;
  currency: string;
  buyer?: Owner;
  ShippingDestination: shippingDestinationType;
  paymentMethod: string; // 'card' | 'mobile money'
  paymentStatus: string;
  Category: string;
  orderStatus: string;
  callback_url: string;
  createdAt?: Date;
};
