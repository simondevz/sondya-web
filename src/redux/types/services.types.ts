import { ImageType } from "./users.types";

export type AdminCreateService = {
  name: string;
  owner?: Owner;
  category: string;
  brief_description: string;
  description: string;
  service_status: string;
  image?: File[] | ImageType[];
  currency: string;
  old_price: number;
  current_price: number;
  percentage_price_off?: number;
  duration: string;

  location_description: string;
  phone_number: string;
  phone_number_backup: string;
  email: string;
  website_link: string;
  country: string;
  state: string;
  city: string;
  map_location_link: string;
};

export type AdminUpdateService = {
  name: string;
  user?: string; //
  owner?: Owner;
  category: string;
  brief_description: string;
  description: string;
  service_status: string;
  image?: File[] | ImageType[];
  currency: string;
  old_price: number;
  current_price: number;
  percentage_price_off?: number;
  duration: string;

  location_description: string;
  phone_number: string;
  phone_number_backup: string;
  email: string;
  website_link: string;
  country: string;
  state: string;
  city: string;
  map_location_link: string;

  id: string;
};

export type AdminGetServiceType = {
  _id: string;
  name: string;
  user?: string; //
  owner?: Owner;
  category: string;
  brief_description: string;
  description: string;
  service_status: string;
  image?: ImageType[];
  currency: string;
  old_price: number;
  current_price: number;
  percentage_price_off?: number;
  duration: string;

  location_description: string;
  phone_number: string;
  phone_number_backup: string;
  email: string;
  website_link: string;
  country: string;
  state: string;
  city: string;
  map_location_link: string;

  date_created: Date;
};

export type Owner = {
  id: string;
  username: string;
  email: string;
};

export type UserGetServiceType = {
  _id: string;
  name: string;
  category: string;
  description: string;
  brief_description: string;
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

export type userGetServicesType = {
  services: UserGetServiceType[];
  count: number;
};

export type sellerGetServicesType = {
  services: AdminGetServiceType[];
  count: number;
};
