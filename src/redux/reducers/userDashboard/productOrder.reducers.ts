import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  CREATE_PRODUCT_ORDER_FAIL,
  CREATE_PRODUCT_ORDER_REQUEST,
  CREATE_PRODUCT_ORDER_RESET,
  CREATE_PRODUCT_ORDER_SUCCESS,
  GET_PRODUCTS_ORDERS_FAIL,
  GET_PRODUCTS_ORDERS_REQUEST,
  GET_PRODUCTS_ORDERS_RESET,
  GET_PRODUCTS_ORDERS_SUCCESS,
  GET_PRODUCTS_ORDER_BYID_FAIL,
  GET_PRODUCTS_ORDER_BYID_REQUEST,
  GET_PRODUCTS_ORDER_BYID_RESET,
  GET_PRODUCTS_ORDER_BYID_SUCCESS,
} from "../../constants/userDashboard/productsOrder.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const userCreateProductOrderReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case CREATE_PRODUCT_ORDER_REQUEST:
      return { ...initialState, loading: true };
    case CREATE_PRODUCT_ORDER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case CREATE_PRODUCT_ORDER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_PRODUCT_ORDER_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetProductsOrdersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_PRODUCTS_ORDERS_REQUEST:
      return { ...initialState, loading: true };
    case GET_PRODUCTS_ORDERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_PRODUCTS_ORDERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_PRODUCTS_ORDERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetProductOrderByIDReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_PRODUCTS_ORDER_BYID_REQUEST:
      return { ...initialState, loading: true };
    case GET_PRODUCTS_ORDER_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_PRODUCTS_ORDER_BYID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_PRODUCTS_ORDER_BYID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
