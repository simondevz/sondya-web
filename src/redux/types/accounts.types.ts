export type BankAccountType = {
  _id?: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  routing_number: string;
  account_id?: string;
};

export type PaypalAccountType = {
  _id?: string;
  paypal_id?: string;
  email: string;
};

export type PayoneerAccountType = {
  _id?: string;
  payoneer_id?: string;
  email: string;
};

export type GetBalanceType = {
  _id: string;
  balance: number;
  paypal_account: PaypalAccountType[];
  payoneer_account: PayoneerAccountType[];
  bank_account: BankAccountType[];
};
