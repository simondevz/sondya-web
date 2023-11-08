export type AdminCreateCategory = {
  name: string;
  description: string;
};

export type AdminUpdateCategory = {
  name: string;
  description: string;

  id?: string;
};

export type AdminGetCategoryType = {
  _id: string;
  name: string;
  description: string;
};
