import {
  ADMIN_GET_PRODUCTS_ORDERS_FAIL,
  ADMIN_GET_PRODUCTS_ORDERS_REQUEST,
  ADMIN_GET_PRODUCTS_ORDERS_RESET,
  ADMIN_GET_PRODUCTS_ORDERS_SUCCESS,
  ADMIN_GET_PRODUCTS_ORDER_BYID_FAIL,
  ADMIN_GET_PRODUCTS_ORDER_BYID_REQUEST,
  ADMIN_GET_PRODUCTS_ORDER_BYID_SUCCESS,
} from "../../constants/admin/ProductOrder.constants";
import { LOGIN_RESET } from "../../constants/auth.constants";
import { GET_PRODUCTS_ORDER_BYID_SUCCESS } from "../../constants/userDashboard/productsOrder.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const adminGetProductsOrdersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_PRODUCTS_ORDERS_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_PRODUCTS_ORDERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_PRODUCTS_ORDERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_PRODUCTS_ORDERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetProductOrderByIDReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_PRODUCTS_ORDER_BYID_REQUEST:
      return { ...initialState, loading: true };
    case GET_PRODUCTS_ORDER_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_PRODUCTS_ORDER_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_PRODUCTS_ORDER_BYID_FAIL:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
