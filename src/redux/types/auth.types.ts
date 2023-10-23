export type RegisterType = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type ForgotPasswordType = {
  email: string;
};

export type VerifyEmailType = {
  code: string;
};

export type ResetPasswordType = {
  password: string;
  confirm_password: string;
};
