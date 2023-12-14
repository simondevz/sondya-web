export type ReduxResponseType<T = any> = {
  loading: boolean;
  success: boolean;
  serverResponse: {
    data: T;
    message: string;
    success: boolean;
  };
  error: any;
};

export type Paginator<T = any> = {
  data: T;
  count?: number;
};

export type ActionType = {
  type: string;
  payload: any;
};


export enum AdminUsersFilterStatus {
  all = 'all',
  active = 'active',
  blocked = 'blocked'
}