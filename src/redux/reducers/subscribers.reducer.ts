import { LOGIN_RESET } from "../constants/auth.constants";
import {
  ADMIN_GET_SUBSCRIBERS_REQUEST,
  ADMIN_GET_SUBSCRIBERS_SUCCESS,
  ADMIN_GET_SUBSCRIBERS_FAIL,
  ADMIN_GET_SUBSCRIBERS_RESET,
  USER_SUBSCRIBE_REQUEST,
  USER_SUBSCRIBE_SUCCESS,
  USER_SUBSCRIBE_FAIL,
  USER_SUBSCRIBE_RESET,
} from "../constants/subscribers.constants";
import { initialState } from "../initial.state";
import { ReduxResponseType, ActionType } from "../types/general.types";

export const getSubscribersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_SUBSCRIBERS_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_SUBSCRIBERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_SUBSCRIBERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_SUBSCRIBERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const subscribeReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_SUBSCRIBE_REQUEST:
      return { ...initialState, loading: true };
    case USER_SUBSCRIBE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_SUBSCRIBE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_SUBSCRIBE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
