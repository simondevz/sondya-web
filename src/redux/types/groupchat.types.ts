import { ImageType } from "./users.types";

export type adminGroupChatType = {
  _id?: string;
  admin_id: string;
  name: string;
  description: string;
  status: string;
  image?: ImageType[];
  files?: any;
  createdAt?: string;
  updatedAt?: string;
};
