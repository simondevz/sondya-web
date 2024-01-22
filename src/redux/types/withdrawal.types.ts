import { Owner } from "./services.types";

export type AdminWithdrawalPaymentType = {
  withdrawal_status: string;
  withdrawal_amount: number;

  id: string;
};

export type SellerWithdrawalType = {
  user: Owner;
  currency: string;
  withdrawal_amount: number;
  withdrawal_mode: string;
  withdrawal_account: any;
};

export type WithdrawalResponseType = {
  _id: string;
  user: Owner;
  currency: string;
  withdrawal_amount: number;
  withdrawal_mode: string;
  withdrawal_account: any;
  withdrawal_status: string;
  createdAt?: Date;
};

export type WithdrawalStatType = {
  pending: number;
  completed: number;
};
