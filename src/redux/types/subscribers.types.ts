export type SubscriberType = {
  _id: string;
  email: string;
  createdAt: string;
};

export type getSubscribersType = {
  subscribers: SubscriberType[];
  count: number;
};
