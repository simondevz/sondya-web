import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  SELLER_CREATE_SERVICE_FAIL,
  SELLER_CREATE_SERVICE_REQUEST,
  SELLER_CREATE_SERVICE_RESET,
  SELLER_CREATE_SERVICE_SUCCESS,
  SELLER_DELETE_SERVICE_FAIL,
  SELLER_DELETE_SERVICE_REQUEST,
  SELLER_DELETE_SERVICE_RESET,
  SELLER_DELETE_SERVICE_SUCCESS,
  SELLER_GETBYID_SERVICE_FAIL,
  SELLER_GETBYID_SERVICE_REQUEST,
  SELLER_GETBYID_SERVICE_RESET,
  SELLER_GETBYID_SERVICE_SUCCESS,
  SELLER_GET_ALL_SERVICE_FAIL,
  SELLER_GET_ALL_SERVICE_REQUEST,
  SELLER_GET_ALL_SERVICE_RESET,
  SELLER_GET_ALL_SERVICE_SUCCESS,
  SELLER_UPDATE_SERVICE_FAIL,
  SELLER_UPDATE_SERVICE_REQUEST,
  SELLER_UPDATE_SERVICE_RESET,
  SELLER_UPDATE_SERVICE_SUCCESS,
} from "../../constants/seller/seller-services.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const sellerCreateServiceReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_CREATE_SERVICE_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_CREATE_SERVICE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_CREATE_SERVICE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_CREATE_SERVICE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerUpdateServiceReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_UPDATE_SERVICE_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_UPDATE_SERVICE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_UPDATE_SERVICE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_UPDATE_SERVICE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerDeleteServiceReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_DELETE_SERVICE_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_DELETE_SERVICE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_DELETE_SERVICE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_DELETE_SERVICE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerGetServiceByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_GETBYID_SERVICE_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_GETBYID_SERVICE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_GETBYID_SERVICE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_GETBYID_SERVICE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerGetServicesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_GET_ALL_SERVICE_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_GET_ALL_SERVICE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_GET_ALL_SERVICE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_GET_ALL_SERVICE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
