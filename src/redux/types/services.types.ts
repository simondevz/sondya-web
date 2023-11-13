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
  country: string;
};
