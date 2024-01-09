import { GetProductOrder } from "./checkout.types";
import { CompanyDetailsType } from "./company_details.types";
import { ServiceOrderType } from "./serviceOrders.types";

export type adminCreateUserType = {
  first_name: string;
  last_name: string;
  username: string;
  country: string;
  email: string;
  password: string;
};

export type adminUpdateUserType = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password?: string;
  type: string;
  phone_number: string;
  address: string;
  state: string;
  country: string;
  zip_code: string;
  status: string;
  image?: ImageType[];

  //social media
  facebook_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  tiktok_url?: string;

  // for route
  id?: string;

  //new
  city: string;
  currency: string;
  language: string;

  company_details: CompanyDetailsType;
};

export type adminUsersId = {
  id: string | undefined;
};

export type adminUGetUserType = {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password?: string;
  type: string;
  phone_number: string;
  address: string;
  state: string;
  country: string;
  zip_code: string;
  status: string;
  website_url: string;
  image: ImageType[];

  //social media
  facebook_url: string;
  linkedin_url: string;
  youtube_url: string;
  instagram_url: string;
  twitter_url: string;
  tiktok_url: string;

  //new
  city: string;
  currency: string;
  language: string;

  company_details: CompanyDetailsType;

  // balance
  balance?: number;
  order_total?: number;
};

export type ImageType = {
  url: string;
  public_id: string;
  folder: string;
  _id: string;
};

export type UserTestimonialType = {
  name: string;
  title: string;
  // For the react quill component
  content?: string;
  // for submitting to the api
  user_id?: string;
};

export type AdminTestimonialType = {
  name: string;
  title: string;
  content: string;
  user_id: { image: Array<any>; _id: string };
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type profileUpdateType = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  state: string;
  country: string;
  zip_code: string;
  website_url: string;
  image?: ImageType[];
  files?: any;

  //new
  address: string;
  city: string;
  currency: string;
  language: string;
};

export type passwordUpdateType = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export type socialsUpdateType = {
  facebook_url: string;
  linkedin_url: string;
  youtube_url: string;
  instagram_url: string;
  twitter_url: string;
  tiktok_url: string;
};

export type AdminGetUserOrder = {
  ProductOrders: GetProductOrder[];
  ServiceOrders: ServiceOrderType[];
};
