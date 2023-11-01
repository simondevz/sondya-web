import {
  ADMIN_CREATE_SERVICE_FAIL,
  ADMIN_CREATE_SERVICE_REQUEST,
  ADMIN_CREATE_SERVICE_RESET,
  ADMIN_CREATE_SERVICE_SUCCESS,
  ADMIN_DELETE_SERVICE_FAIL,
  ADMIN_DELETE_SERVICE_REQUEST,
  ADMIN_DELETE_SERVICE_RESET,
  ADMIN_DELETE_SERVICE_SUCCESS,
  ADMIN_GETBYID_SERVICE_FAIL,
  ADMIN_GETBYID_SERVICE_REQUEST,
  ADMIN_GETBYID_SERVICE_RESET,
  ADMIN_GETBYID_SERVICE_SUCCESS,
  ADMIN_GET_ALL_SERVICE_FAIL,
  ADMIN_GET_ALL_SERVICE_REQUEST,
  ADMIN_GET_ALL_SERVICE_RESET,
  ADMIN_GET_ALL_SERVICE_SUCCESS,
  ADMIN_UPDATE_SERVICE_FAIL,
  ADMIN_UPDATE_SERVICE_REQUEST,
  ADMIN_UPDATE_SERVICE_RESET,
  ADMIN_UPDATE_SERVICE_SUCCESS,
} from "../../constants/admin/services.constants";
import { LOGIN_RESET } from "../../constants/auth.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const adminCreateServiceReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_CREATE_SERVICE_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_CREATE_SERVICE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_CREATE_SERVICE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_CREATE_SERVICE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminUpdateServiceReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_UPDATE_SERVICE_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_UPDATE_SERVICE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_UPDATE_SERVICE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_UPDATE_SERVICE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminDeleteServiceReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_DELETE_SERVICE_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_DELETE_SERVICE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_DELETE_SERVICE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_DELETE_SERVICE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetServiceByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GETBYID_SERVICE_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GETBYID_SERVICE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GETBYID_SERVICE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GETBYID_SERVICE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetServicesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_ALL_SERVICE_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_ALL_SERVICE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_ALL_SERVICE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_ALL_SERVICE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
