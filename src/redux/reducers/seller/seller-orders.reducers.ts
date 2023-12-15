import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  SELLER_DELETE_PRODUCTS_ORDER_BYID_FAIL,
  SELLER_DELETE_PRODUCTS_ORDER_BYID_REQUEST,
  SELLER_DELETE_PRODUCTS_ORDER_BYID_RESET,
  SELLER_DELETE_PRODUCTS_ORDER_BYID_SUCCESS,
  SELLER_GET_PRODUCTS_ORDERS_FAIL,
  SELLER_GET_PRODUCTS_ORDERS_REQUEST,
  SELLER_GET_PRODUCTS_ORDERS_RESET,
  SELLER_GET_PRODUCTS_ORDERS_SUCCESS,
  SELLER_GET_PRODUCTS_ORDER_BYID_FAIL,
  SELLER_GET_PRODUCTS_ORDER_BYID_REQUEST,
  SELLER_GET_PRODUCTS_ORDER_BYID_RESET,
  SELLER_GET_PRODUCTS_ORDER_BYID_SUCCESS,
} from "../../constants/seller/seller-orders.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const sellerGetProductsOrdersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_GET_PRODUCTS_ORDERS_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_GET_PRODUCTS_ORDERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_GET_PRODUCTS_ORDERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_GET_PRODUCTS_ORDERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerGetProductOrderByIDReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_GET_PRODUCTS_ORDER_BYID_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_GET_PRODUCTS_ORDER_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_GET_PRODUCTS_ORDER_BYID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_GET_PRODUCTS_ORDER_BYID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerDeleteProductOrderByIDReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_DELETE_PRODUCTS_ORDER_BYID_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_DELETE_PRODUCTS_ORDER_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_DELETE_PRODUCTS_ORDER_BYID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_DELETE_PRODUCTS_ORDER_BYID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
