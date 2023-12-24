export type TermsType = {
  order_id: string;
  buyer_id?: string;
  seller_id?: string;
  amount: number;
  advance: number;
  duration: number;
  durationUnit: string;
  acceptedByBuyer: boolean;
  acceptedBySeller: boolean;
  rejectedByBuyer: boolean;
  rejectedBySeller: boolean;
};

export type CreateServiceOrderType = {
  buyer?: {
    id: string;
    username: string;
    email: string;
  };
  seller: {
    id: string;
    username: string;
    email: string;
  };
  service_id: string;
};

export type ServiceOrderType = CreateServiceOrderType & {
  _id: string;
  terms: TermsType;
  delivered: boolean;
};
