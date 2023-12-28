import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  SELLER_ADD_BANK_FAIL,
  SELLER_ADD_BANK_REQUEST,
  SELLER_ADD_BANK_RESET,
  SELLER_ADD_BANK_SUCCESS,
  SELLER_ADD_PAYONEER_FAIL,
  SELLER_ADD_PAYONEER_REQUEST,
  SELLER_ADD_PAYONEER_RESET,
  SELLER_ADD_PAYONEER_SUCCESS,
  SELLER_ADD_PAYPAL_FAIL,
  SELLER_ADD_PAYPAL_REQUEST,
  SELLER_ADD_PAYPAL_RESET,
  SELLER_ADD_PAYPAL_SUCCESS,
  SELLER_DELETE_BANK_FAIL,
  SELLER_DELETE_BANK_REQUEST,
  SELLER_DELETE_BANK_RESET,
  SELLER_DELETE_BANK_SUCCESS,
  SELLER_DELETE_PAYONEER_FAIL,
  SELLER_DELETE_PAYONEER_REQUEST,
  SELLER_DELETE_PAYONEER_RESET,
  SELLER_DELETE_PAYONEER_SUCCESS,
  SELLER_DELETE_PAYPAL_FAIL,
  SELLER_DELETE_PAYPAL_REQUEST,
  SELLER_DELETE_PAYPAL_RESET,
  SELLER_DELETE_PAYPAL_SUCCESS,
  SELLER_GET_BALANCE_FAIL,
  SELLER_GET_BALANCE_REQUEST,
  SELLER_GET_BALANCE_RESET,
  SELLER_GET_BALANCE_SUCCESS,
} from "../../constants/seller/seller-accounts.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const sellerGetBalanceReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_GET_BALANCE_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_GET_BALANCE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_GET_BALANCE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_GET_BALANCE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerAddBankAccountReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_ADD_BANK_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_ADD_BANK_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_ADD_BANK_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_ADD_BANK_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerDeleteBankAccountReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_DELETE_BANK_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_DELETE_BANK_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_DELETE_BANK_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_DELETE_BANK_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerAddPaypalReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_ADD_PAYPAL_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_ADD_PAYPAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_ADD_PAYPAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_ADD_PAYPAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerDeletePaypalReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_DELETE_PAYPAL_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_DELETE_PAYPAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_DELETE_PAYPAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_DELETE_PAYPAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerAddPayoneerReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_ADD_PAYONEER_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_ADD_PAYONEER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_ADD_PAYONEER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_ADD_PAYONEER_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const sellerDeletePayoneerReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_DELETE_PAYONEER_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_DELETE_PAYONEER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_DELETE_PAYONEER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_DELETE_PAYONEER_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
