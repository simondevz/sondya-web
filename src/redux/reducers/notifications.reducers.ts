import { LOGIN_RESET } from "../constants/auth.constants";
import {
  CREATE_SELLER_NOTIFICATION_FAIL,
  CREATE_SELLER_NOTIFICATION_REQUEST,
  CREATE_SELLER_NOTIFICATION_RESET,
  CREATE_SELLER_NOTIFICATION_SUCCESS,
  CREATE_USER_NOTIFICATION_FAIL,
  CREATE_USER_NOTIFICATION_REQUEST,
  CREATE_USER_NOTIFICATION_RESET,
  CREATE_USER_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAIL,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_RESET,
  DELETE_NOTIFICATION_SUCCESS,
  GET_4_NOTIFICATIONS_FAIL,
  GET_4_NOTIFICATIONS_REQUEST,
  GET_4_NOTIFICATIONS_RESET,
  GET_4_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_RESET,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATION_UNSEEN_COUNT_FAIL,
  GET_NOTIFICATION_UNSEEN_COUNT_REQUEST,
  GET_NOTIFICATION_UNSEEN_COUNT_RESET,
  GET_NOTIFICATION_UNSEEN_COUNT_SUCCESS,
  MARK_NOTIFICATION_SEEN_FAIL,
  MARK_NOTIFICATION_SEEN_REQUEST,
  MARK_NOTIFICATION_SEEN_RESET,
  MARK_NOTIFICATION_SEEN_SUCCESS,
} from "../constants/notifications.constants";
import { initialState } from "../initial.state";
import { ReduxResponseType, ActionType } from "../types/general.types";

export const createUserNotificationReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case CREATE_USER_NOTIFICATION_REQUEST:
      return { ...initialState, loading: true };
    case CREATE_USER_NOTIFICATION_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case CREATE_USER_NOTIFICATION_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_USER_NOTIFICATION_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const createSellerNotificationReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case CREATE_SELLER_NOTIFICATION_REQUEST:
      return { ...initialState, loading: true };
    case CREATE_SELLER_NOTIFICATION_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case CREATE_SELLER_NOTIFICATION_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_SELLER_NOTIFICATION_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const getNotificationsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return { ...initialState, loading: true };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_NOTIFICATIONS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_NOTIFICATIONS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const get4NotificationsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_4_NOTIFICATIONS_REQUEST:
      return { ...initialState, loading: true };
    case GET_4_NOTIFICATIONS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_4_NOTIFICATIONS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_4_NOTIFICATIONS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const deleteNotificationReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case DELETE_NOTIFICATION_REQUEST:
      return { ...initialState, loading: true };
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case DELETE_NOTIFICATION_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case DELETE_NOTIFICATION_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const markNotificationSeenReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case MARK_NOTIFICATION_SEEN_REQUEST:
      return { ...initialState, loading: true };
    case MARK_NOTIFICATION_SEEN_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case MARK_NOTIFICATION_SEEN_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case MARK_NOTIFICATION_SEEN_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const getNotificationUnseenCountReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_NOTIFICATION_UNSEEN_COUNT_REQUEST:
      return { ...initialState, loading: true };
    case GET_NOTIFICATION_UNSEEN_COUNT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_NOTIFICATION_UNSEEN_COUNT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_NOTIFICATION_UNSEEN_COUNT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
