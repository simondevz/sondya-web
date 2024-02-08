export type LoginResponseType = {
  id: string;
  email: string;
  username?: string;
  email_verified?: boolean;
  kyc_completed?: boolean;
  token: string;
  type: "admin" | "user";
};

export type RegisterType = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  country: string;
  password: string;
  referrer: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type ForgotPasswordType = {
  email: string;
};

export type VerifyEmailType = {
  email: string | undefined;
  code: string;
};

export type ResetPasswordType = {
  email: string | undefined;
  password: string;
  confirm_password: string;
};
