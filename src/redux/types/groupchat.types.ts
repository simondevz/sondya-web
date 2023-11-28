import { ImageType, adminUGetUserType } from "./users.types";

export type adminGroupChatType = {
  _id?: string;
  admin_id: string;
  name: string;
  description: string;
  status: string;
  image?: ImageType[];
  message?: groupMessageType[];
  files?: any;
  createdAt?: string;
  updatedAt?: string;
};

export type groupMessageType = {
  _id?: string;
  message: string;
  group_id: string;
  sender_id: string;
  createdAt?: string;
  likes?: string[];
  sender?: adminUGetUserType;
};

export type groupMemberType = {
  _id: string;
  user_id: {
    _id: string;
    username: string;
    email: string;
    image: ImageType[];
  };
  group_id: string;
  createdAt: string;
  updatedAt: string;
};
