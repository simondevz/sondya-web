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
  quantity: number;
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
  quantity: number;
  image?: File[] | ImageType[];

  owner?: Owner;

  // product id
  id: string;
  // deleteImageId?: string[];
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
  quantity: number;
  image?: ImageType[];

  owner?: Owner;
};

export type UserGetProductType = {
  _id: string;
  name: string;
  category: string;
  createdAt: string;
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
  quantity: number;
  image?: ImageType[];
  rating: number;
  total_rating: number;

  owner?: Owner;
};

export type userGetProductsType = {
  products: UserGetProductType[];
  count: number;
};

export type sellerGetProductsType = {
  products: AdminGetProductType[];
  count: number;
};
