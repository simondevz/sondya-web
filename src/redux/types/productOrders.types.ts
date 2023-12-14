import { Owner } from "./services.types";
import { ImageType } from "./users.types";

export type ProductOrderType = {
  _id: string;
  name: string;
  category: string;
  sub_category: string;
  description: string;
  total_stock: number;
  tag: string;
  brand: string;
  model: string;
  current_price: number;
  product_status: string;
  old_price: number;
  discount_percentage: number;
  vat_percentage: number;
  total_variants: number;
  image?: ImageType[];

  owner?: Owner;

  // order variables
  order_quantity: number;
  sub_total: number;

  shipping_fee: number;
  tax: number;
  discount: number;

  total_price?: number;
};
