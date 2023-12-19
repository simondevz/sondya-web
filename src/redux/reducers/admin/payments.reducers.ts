import {
  GET_ADMIN_PAYMENTS_BYID_FAIL,
  GET_ADMIN_PAYMENTS_BYID_REQUEST,
  GET_ADMIN_PAYMENTS_BYID_RESET,
  GET_ADMIN_PAYMENTS_BYID_SUCCESS,
  GET_ADMIN_PAYMENTS_FAIL,
  GET_ADMIN_PAYMENTS_REQUEST,
  GET_ADMIN_PAYMENTS_RESET,
  GET_ADMIN_PAYMENTS_SUCCESS,
} from "../../constants/admin/payments.constants";
import { LOGIN_RESET } from "../../constants/auth.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const adminGetPaymentsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_ADMIN_PAYMENTS_REQUEST:
      return { ...initialState, loading: true };
    case GET_ADMIN_PAYMENTS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_ADMIN_PAYMENTS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_ADMIN_PAYMENTS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetPaymentsByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_ADMIN_PAYMENTS_BYID_REQUEST:
      return { ...initialState, loading: true };
    case GET_ADMIN_PAYMENTS_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_ADMIN_PAYMENTS_BYID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_ADMIN_PAYMENTS_BYID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
