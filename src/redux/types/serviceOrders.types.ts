import { ImageType } from "./users.types";

export type TermsType = {
  amount: number;
  duration: number;
  durationUnit: string;
  acceptedByBuyer: boolean;
  acceptedBySeller: boolean;
  rejectedByBuyer: boolean;
  rejectedBySeller: boolean;
};

export type CreateServiceOrderType = {
  buyer?: {
    id: string;
    username: string;
    email: string;
    phone: string;
  };
  seller: {
    id: string;
    username: string;
    email: string;
    phone: string;
  };
  order_status: string;
  checkout_items: {
    _id: string;
    name: string;
    category: string;
    sub_category: string;
    brief_description: string;
    description: string;
    // owner
    owner: {
      id: string;
      username: string;
      email: string;
      phone_number: string;
    };
    currency: string;
    old_price: number;
    current_price: number;
    percentage_price_off: number;
    service_status: string;
    image?: ImageType[];
    location_description: string;
    phone_number: string;
    phone_number_backup: string;
    email: string;
    website_link: string;
    country: string;
    state: string;
    city: string;
    map_location_link: string;
    terms: TermsType;
  };
};

export type ServiceOrderType = {
  _id?: string;
  buyer: {
    id: string;
    username: string;
    email: string;
    phone?: string;
  };
  seller: {
    id: string;
    username: string;
    email: string;
    phone?: string;
  };
  order_id: string;
  payment_id: string;
  payment_status: string;
  order_status: string;
  createdAt: string;
  checkout_items: {
    _id: string;
    name: string;
    category: string;
    sub_category: string;
    brief_description: string;
    description: string;
    total_price: number;
    delivery_time?: string;
    // owner
    owner: {
      id: string;
      username: string;
      email: string;
      phone: string;
      country: string;
    };
    currency: string;
    old_price: number;
    current_price: number;
    percentage_price_off: number;
    service_status: string;
    image: ImageType[];
    location_description: string;
    phone_number: string;
    phone_number_backup: string;
    email: string;
    website_link: string;
    country: string;
    state: string;
    city: string;
    map_location_link: string;
    terms: TermsType;
  };
};
