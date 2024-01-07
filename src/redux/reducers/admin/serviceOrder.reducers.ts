import {
  ADMIN_GET_SERVICE_ORDERS_REQUEST,
  ADMIN_GET_SERVICE_ORDERS_SUCCESS,
  ADMIN_GET_SERVICE_ORDERS_FAIL,
  ADMIN_GET_SERVICE_ORDERS_RESET,
  ADMIN_GET_SERVICE_ORDER_BYID_REQUEST,
  ADMIN_GET_SERVICE_ORDER_BYID_SUCCESS,
  ADMIN_GET_SERVICE_ORDER_BYID_FAIL,
  ADMIN_GET_SERVICE_ORDER_BYID_RESET,
  ADMIN_DELETE_SERVICE_ORDER_BYID_REQUEST,
  ADMIN_DELETE_SERVICE_ORDER_BYID_SUCCESS,
  ADMIN_DELETE_SERVICE_ORDER_BYID_FAIL,
  ADMIN_DELETE_SERVICE_ORDER_BYID_RESET,
} from "../../constants/admin/serviceOrder.constants";
import { LOGIN_RESET } from "../../constants/auth.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const adminGetServiceOrdersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_SERVICE_ORDERS_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_SERVICE_ORDERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_SERVICE_ORDERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_SERVICE_ORDERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetServiceOrderByIDReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_SERVICE_ORDER_BYID_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_SERVICE_ORDER_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_SERVICE_ORDER_BYID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_SERVICE_ORDER_BYID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminDeleteServiceOrderByIDReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_DELETE_SERVICE_ORDER_BYID_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_DELETE_SERVICE_ORDER_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_DELETE_SERVICE_ORDER_BYID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_DELETE_SERVICE_ORDER_BYID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
