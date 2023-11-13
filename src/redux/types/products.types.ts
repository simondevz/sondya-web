import { Owner } from "./services.types";
import { ImageType } from "./users.types";

export type AdminCreateProduct = {
  name: string;
  category: string;
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
  image?: File[] | ImageType[];

  owner?: Owner;
};

export type AdminUpdateProduct = {
  name: string;
  category: string;
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
  image?: File[] | ImageType[];

  owner?: Owner;

  // product id
  id: string;
};

export type AdminGetProductType = {
  _id: string;
  name: string;
  category: string;
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
};
