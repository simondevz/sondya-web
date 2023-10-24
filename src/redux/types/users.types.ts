export type adminCreateUserType = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
};

export type adminUpdateUserType = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;

  // for route
  id: string;
};

export type adminUsersId = {
  id: string;
};
