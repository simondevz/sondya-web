import { ProductOrderType } from "./productOrders.types";
import { Owner } from "./services.types";
import { shippingDestinationType } from "./shippingdestination.types";

export type CheckoutType = {
  checkoutItems: ProductOrderType[];
  shippingFee: number;
  tax: number;
  discount: number;
  totalAmount: number;
  currency: string;
  buyer?: Owner;
  ShippingDestination: shippingDestinationType;
};
