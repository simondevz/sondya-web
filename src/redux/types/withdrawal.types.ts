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
