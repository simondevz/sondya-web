import {
  ADMIN_DELETE_WITHDRAWAL_FAIL,
  ADMIN_DELETE_WITHDRAWAL_REQUEST,
  ADMIN_DELETE_WITHDRAWAL_RESET,
  ADMIN_DELETE_WITHDRAWAL_SUCCESS,
  ADMIN_GET_WITHDRAWALS_FAIL,
  ADMIN_GET_WITHDRAWALS_REQUEST,
  ADMIN_GET_WITHDRAWALS_RESET,
  ADMIN_GET_WITHDRAWALS_SUCCESS,
  ADMIN_GET_WITHDRAWAL_BYID_FAIL,
  ADMIN_GET_WITHDRAWAL_BYID_REQUEST,
  ADMIN_GET_WITHDRAWAL_BYID_RESET,
  ADMIN_GET_WITHDRAWAL_BYID_SUCCESS,
  ADMIN_PENDING_WITHDRAWAL_FAIL,
  ADMIN_PENDING_WITHDRAWAL_REQUEST,
  ADMIN_PENDING_WITHDRAWAL_RESET,
  ADMIN_PENDING_WITHDRAWAL_SUCCESS,
  ADMIN_WITHDRAWAL_PAYMENT_FAIL,
  ADMIN_WITHDRAWAL_PAYMENT_REQUEST,
  ADMIN_WITHDRAWAL_PAYMENT_RESET,
  ADMIN_WITHDRAWAL_PAYMENT_SUCCESS,
} from "../../constants/admin/admin-withdrawal.constants";
import { LOGIN_RESET } from "../../constants/auth.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const adminWithdrawalPaymentReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_WITHDRAWAL_PAYMENT_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_WITHDRAWAL_PAYMENT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_WITHDRAWAL_PAYMENT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_WITHDRAWAL_PAYMENT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetPendingWithdrawalsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_PENDING_WITHDRAWAL_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_PENDING_WITHDRAWAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_PENDING_WITHDRAWAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_PENDING_WITHDRAWAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetWithdrawalHistoryReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_WITHDRAWALS_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_WITHDRAWALS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_WITHDRAWALS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_WITHDRAWALS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetWithdrawalByIDReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_WITHDRAWAL_BYID_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_WITHDRAWAL_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_WITHDRAWAL_BYID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_WITHDRAWAL_BYID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminDeleteWithdrawalReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_DELETE_WITHDRAWAL_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_DELETE_WITHDRAWAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_DELETE_WITHDRAWAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_DELETE_WITHDRAWAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
