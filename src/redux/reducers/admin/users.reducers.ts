import {
  ADMIN_CREATE_USER_FAIL,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_CREATE_USER_RESET,
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_RESET,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_GETBYID_USER_FAIL,
  ADMIN_GETBYID_USER_REQUEST,
  ADMIN_GETBYID_USER_RESET,
  ADMIN_GETBYID_USER_SUCCESS,
  ADMIN_GET_ALL_USERS_FAIL,
  ADMIN_GET_ALL_USERS_REQUEST,
  ADMIN_GET_ALL_USERS_RESET,
  ADMIN_GET_ALL_USERS_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_RESET,
  ADMIN_UPDATE_USER_SUCCESS,
} from "../../constants/admin/users.constants";
import { LOGIN_RESET } from "../../constants/auth.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";
// import { initialState } from "../auth.reducers";

export const adminCreateUserReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_CREATE_USER_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_CREATE_USER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_CREATE_USER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_CREATE_USER_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminUpdateUserReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_UPDATE_USER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_UPDATE_USER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_UPDATE_USER_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminDeleteUserReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_DELETE_USER_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_DELETE_USER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_DELETE_USER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_DELETE_USER_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetUserByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GETBYID_USER_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GETBYID_USER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GETBYID_USER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GETBYID_USER_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetUsersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_ALL_USERS_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_ALL_USERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: {
          ...action.payload,                                                                 
          data: action.payload?.data?.data ?? [],
          count: action.payload?.data?.count
        },
      };
    case ADMIN_GET_ALL_USERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_ALL_USERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
