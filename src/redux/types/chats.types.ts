import { chatImageType } from "./groupchat.types";
import { ImageType } from "./users.types";

export type chatMessageType = {
  _id: string;
  sender?: ChatUserType;
  sender_id?: ChatUserType;
  chat_id: string;
  message?: string;
  image?: ImageType[];
  service_id?: string;
  product_id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type sendChatMessageType = {
  sender_id: string;
  reciever_id: string;
  room_id: string;
  message?: string;
  image?: chatImageType[];
};

export type GetChatsType = {
  _id: string;
  user1: ChatUserType;
  user2: ChatUserType;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  messages: chatMessageType[];
};

export type ChatUserType = {
  _id?: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  image?: ImageType[];
};
