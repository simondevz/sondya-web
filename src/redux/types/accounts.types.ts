export type BankAccountType = {
  account_name: string;
  account_number: string;
  bank_name: string;
  routing_number: string;
  account_id?: string;
};

export type PaypalAccountType = {
  paypal_id?: string;
  email: string;
};

export type PayoneerAccountType = {
  payoneer_id?: string;
  email: string;
};
