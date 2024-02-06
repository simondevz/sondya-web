export type kycPersonalInfoType = {
  first_name: string;
  last_name: string;
  gender: string;
  marital_status: string;
  date_of_birth: string;
};

export type kycContactInfoType = {
  address: string;
  phone_number: string;
  city: string;
  state: string;
  country: string;
};

export type kycDocumentFileType = {
  // id: string;
  //   image?: ImageType[];
  image?: File;
};

export type kycDisplayPictureType = {
  // id: string;
  image?: File;
};
