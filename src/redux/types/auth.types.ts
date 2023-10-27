export type LoginResponseType = {
  accessToken: string;
  username: string;
  userType: "admin" | "user";
};

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
  email: string | undefined;
  code: string;
};

export type ResetPasswordType = {
  email: string | undefined;
  password: string;
  confirm_password: string;
};
