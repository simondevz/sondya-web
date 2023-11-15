export type adminCreateUserType = {
  first_name: string;
  last_name: string;
  username: string;
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
  image: ImageType[];

  //social media
  facebook_url: string;
  linkedin_url: string;
  youtube_url: string;
  instagram_url: string;
  twitter_url: string;
  tiktok_url: string;
};

export type ImageType = {
  url?: string;
  public_id?: string;
  folder?: string;
  _id?: string;
};

export type profileUpdateType = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password?: string;
  phone_number: string;
  state: string;
  country: string;
  zip_code: string;
  image?: ImageType[];

  // for route
  id?: string;
};

export type passwordUpdateType = {
  current_password: string;
  new_password: string;
  confirm_password: string;

  // for route
  id?: string;
};

export type socialsUpdateType = {
  facebook_url: string;
  linkedin_url: string;
  youtube_url: string;
  instagram_url: string;
  twitter_url: string;
  tiktok_url: string;

  // for route
  id?: string;
};
