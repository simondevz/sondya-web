import {
  ADMIN_CREATE_PRODUCT_FAIL,
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_RESET,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_RESET,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_GETBYID_PRODUCT_FAIL,
  ADMIN_GETBYID_PRODUCT_REQUEST,
  ADMIN_GETBYID_PRODUCT_RESET,
  ADMIN_GETBYID_PRODUCT_SUCCESS,
  ADMIN_GET_ALL_PRODUCT_FAIL,
  ADMIN_GET_ALL_PRODUCT_REQUEST,
  ADMIN_GET_ALL_PRODUCT_RESET,
  ADMIN_GET_ALL_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_RESET,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
} from "../../constants/admin/products.constants";
import { LOGIN_RESET } from "../../constants/auth.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const adminCreateProductReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_CREATE_PRODUCT_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_CREATE_PRODUCT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_CREATE_PRODUCT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_CREATE_PRODUCT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminUpdateProductReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_UPDATE_PRODUCT_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_UPDATE_PRODUCT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_UPDATE_PRODUCT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_UPDATE_PRODUCT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminDeleteProductReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_DELETE_PRODUCT_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_DELETE_PRODUCT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_DELETE_PRODUCT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_DELETE_PRODUCT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetProductByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GETBYID_PRODUCT_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GETBYID_PRODUCT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GETBYID_PRODUCT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GETBYID_PRODUCT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetProductsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_ALL_PRODUCT_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_ALL_PRODUCT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_ALL_PRODUCT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_ALL_PRODUCT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
