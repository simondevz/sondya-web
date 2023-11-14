import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  SELLER_CREATE_PRODUCT_FAIL,
  SELLER_CREATE_PRODUCT_REQUEST,
  SELLER_CREATE_PRODUCT_RESET,
  SELLER_CREATE_PRODUCT_SUCCESS,
  SELLER_DELETE_PRODUCT_FAIL,
  SELLER_DELETE_PRODUCT_REQUEST,
  SELLER_DELETE_PRODUCT_RESET,
  SELLER_DELETE_PRODUCT_SUCCESS,
  SELLER_GETBYID_PRODUCT_FAIL,
  SELLER_GETBYID_PRODUCT_REQUEST,
  SELLER_GETBYID_PRODUCT_RESET,
  SELLER_GETBYID_PRODUCT_SUCCESS,
  SELLER_GET_ALL_PRODUCT_FAIL,
  SELLER_GET_ALL_PRODUCT_REQUEST,
  SELLER_GET_ALL_PRODUCT_RESET,
  SELLER_GET_ALL_PRODUCT_SUCCESS,
  SELLER_UPDATE_PRODUCT_FAIL,
  SELLER_UPDATE_PRODUCT_REQUEST,
  SELLER_UPDATE_PRODUCT_RESET,
  SELLER_UPDATE_PRODUCT_SUCCESS,
} from "../../constants/seller/seller-products.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const sellerCreateProductReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_CREATE_PRODUCT_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_CREATE_PRODUCT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_CREATE_PRODUCT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_CREATE_PRODUCT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerUpdateProductReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_UPDATE_PRODUCT_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_UPDATE_PRODUCT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_UPDATE_PRODUCT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_UPDATE_PRODUCT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerDeleteProductReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_DELETE_PRODUCT_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_DELETE_PRODUCT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_DELETE_PRODUCT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_DELETE_PRODUCT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerGetProductByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_GETBYID_PRODUCT_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_GETBYID_PRODUCT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_GETBYID_PRODUCT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_GETBYID_PRODUCT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerGetProductsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_GET_ALL_PRODUCT_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_GET_ALL_PRODUCT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_GET_ALL_PRODUCT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_GET_ALL_PRODUCT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
