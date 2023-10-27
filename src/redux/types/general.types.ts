export type ReduxResponseType<T = any> = {
  loading: boolean;
  success: boolean;
  serverResponse: { data: T; message: string; success: boolean };
  error: any;
};

export type ActionType = {
  type: string;
  payload: any;
};
