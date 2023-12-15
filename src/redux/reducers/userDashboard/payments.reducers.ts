import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  GET_USER_PAYMENTS_BYID_FAIL,
  GET_USER_PAYMENTS_BYID_REQUEST,
  GET_USER_PAYMENTS_BYID_RESET,
  GET_USER_PAYMENTS_BYID_SUCCESS,
  GET_USER_PAYMENTS_FAIL,
  GET_USER_PAYMENTS_REQUEST,
  GET_USER_PAYMENTS_RESET,
  GET_USER_PAYMENTS_SUCCESS,
} from "../../constants/userDashboard/payments.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const userGetPaymentsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_USER_PAYMENTS_REQUEST:
      return { ...initialState, loading: true };
    case GET_USER_PAYMENTS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_USER_PAYMENTS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_USER_PAYMENTS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetPaymentsByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_USER_PAYMENTS_BYID_REQUEST:
      return { ...initialState, loading: true };
    case GET_USER_PAYMENTS_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_USER_PAYMENTS_BYID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_USER_PAYMENTS_BYID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
