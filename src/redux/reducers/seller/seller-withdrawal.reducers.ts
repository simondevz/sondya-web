import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  SELLER_DELETE_WITHDRAWAL_FAIL,
  SELLER_DELETE_WITHDRAWAL_REQUEST,
  SELLER_DELETE_WITHDRAWAL_RESET,
  SELLER_DELETE_WITHDRAWAL_SUCCESS,
  SELLER_GET_WITHDRAWALS_FAIL,
  SELLER_GET_WITHDRAWALS_REQUEST,
  SELLER_GET_WITHDRAWALS_RESET,
  SELLER_GET_WITHDRAWALS_SUCCESS,
  SELLER_GET_WITHDRAWAL_BYID_FAIL,
  SELLER_GET_WITHDRAWAL_BYID_REQUEST,
  SELLER_GET_WITHDRAWAL_BYID_RESET,
  SELLER_GET_WITHDRAWAL_BYID_SUCCESS,
  SELLER_GET_WITHDRAWAL_STATS_FAIL,
  SELLER_GET_WITHDRAWAL_STATS_REQUEST,
  SELLER_GET_WITHDRAWAL_STATS_RESET,
  SELLER_GET_WITHDRAWAL_STATS_SUCCESS,
  SELLER_WITHDRAWAL_FAIL,
  SELLER_WITHDRAWAL_REQUEST,
  SELLER_WITHDRAWAL_RESET,
  SELLER_WITHDRAWAL_SUCCESS,
} from "../../constants/seller/seller-withdrawals.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const sellerWithdrawalReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_WITHDRAWAL_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_WITHDRAWAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_WITHDRAWAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_WITHDRAWAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerGetWithdrawalsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_GET_WITHDRAWALS_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_GET_WITHDRAWALS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_GET_WITHDRAWALS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_GET_WITHDRAWALS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerGetWithdrawalByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_GET_WITHDRAWAL_BYID_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_GET_WITHDRAWAL_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_GET_WITHDRAWAL_BYID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_GET_WITHDRAWAL_BYID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerDeleteWithdrawalsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_DELETE_WITHDRAWAL_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_DELETE_WITHDRAWAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_DELETE_WITHDRAWAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_DELETE_WITHDRAWAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerGetWithdrawalStatReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_GET_WITHDRAWAL_STATS_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_GET_WITHDRAWAL_STATS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_GET_WITHDRAWAL_STATS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_GET_WITHDRAWAL_STATS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
