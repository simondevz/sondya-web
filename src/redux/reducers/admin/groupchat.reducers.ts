import {
  ADMIN_ACTIVATE_GROUPCHAT_FAIL,
  ADMIN_ACTIVATE_GROUPCHAT_REQUEST,
  ADMIN_ACTIVATE_GROUPCHAT_RESET,
  ADMIN_ACTIVATE_GROUPCHAT_SUCCESS,
  ADMIN_CREATE_GROUPCHAT_FAIL,
  ADMIN_CREATE_GROUPCHAT_REQUEST,
  ADMIN_CREATE_GROUPCHAT_RESET,
  ADMIN_CREATE_GROUPCHAT_SUCCESS,
  ADMIN_DELETE_GROUPCHAT_FAIL,
  ADMIN_DELETE_GROUPCHAT_REQUEST,
  ADMIN_DELETE_GROUPCHAT_RESET,
  ADMIN_DELETE_GROUPCHAT_SUCCESS,
  ADMIN_GET_GROUPCHATS_FAIL,
  ADMIN_GET_GROUPCHATS_REQUEST,
  ADMIN_GET_GROUPCHATS_RESET,
  ADMIN_GET_GROUPCHATS_SUCCESS,
  ADMIN_SUSPEND_GROUPCHAT_FAIL,
  ADMIN_SUSPEND_GROUPCHAT_REQUEST,
  ADMIN_SUSPEND_GROUPCHAT_RESET,
  ADMIN_SUSPEND_GROUPCHAT_SUCCESS,
} from "../../constants/admin/groupchat.constants";
import { LOGIN_RESET } from "../../constants/auth.constants";
import { initialState } from "../../initial.state";
import { ReduxResponseType, ActionType } from "../../types/general.types";

export const adminCreateGroupchatReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_CREATE_GROUPCHAT_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_CREATE_GROUPCHAT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_CREATE_GROUPCHAT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_CREATE_GROUPCHAT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetGroupchatReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_GROUPCHATS_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_GROUPCHATS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_GROUPCHATS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_GROUPCHATS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminDeleteGroupchatReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_DELETE_GROUPCHAT_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_DELETE_GROUPCHAT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_DELETE_GROUPCHAT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_DELETE_GROUPCHAT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminActivateGroupchatReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_ACTIVATE_GROUPCHAT_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_ACTIVATE_GROUPCHAT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_ACTIVATE_GROUPCHAT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_ACTIVATE_GROUPCHAT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminSuspendGroupchatReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_SUSPEND_GROUPCHAT_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_SUSPEND_GROUPCHAT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_SUSPEND_GROUPCHAT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_SUSPEND_GROUPCHAT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
