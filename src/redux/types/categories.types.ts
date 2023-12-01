import { ImageType } from "./users.types";

export type AdminCreateCategory = {
  name: string;
  description: string;
  category: string;
  image?: File | null;
};

export type AdminUpdateCategory = {
  name: string;
  description: string;
  image?: File | ImageType[];
  category: string;
  id?: string;
};

export type AdminGetCategoryType = {
  _id: string;
  name: string;
  description: string;
  category: string;
  image?: ImageType[];
};
