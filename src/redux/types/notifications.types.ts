export type NotificationType = {
  _id?: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
  title: string;
  message: string;
  type: "order_recieved" | "order_sent" | "chat_message";
  link: string;
  seen: boolean;
  createdAt?: string;
};

export type GetNotificationType = {
  count: number;
  notifications: NotificationType[];
};
