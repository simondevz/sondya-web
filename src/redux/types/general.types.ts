export type ReduxResponseType<T = any> = {
  loading: boolean;
  success: boolean;
  serverResponse: { data: T; message: string; success: boolean };
  error: any;
  // testimonial: {
  //   loading: boolean;
  //   success: boolean;
  //   error: string;
  //   serverResponse: any;
  // };
};

export type ActionType = {
  type: string;
  payload: any;
};
