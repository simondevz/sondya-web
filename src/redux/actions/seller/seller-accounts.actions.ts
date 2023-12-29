import axios from "axios";
import { Dispatch } from "redux";
import {
  SELLER_ADD_BANK_FAIL,
  SELLER_ADD_BANK_REQUEST,
  SELLER_ADD_BANK_SUCCESS,
  SELLER_ADD_PAYONEER_FAIL,
  SELLER_ADD_PAYONEER_REQUEST,
  SELLER_ADD_PAYONEER_SUCCESS,
  SELLER_ADD_PAYPAL_FAIL,
  SELLER_ADD_PAYPAL_REQUEST,
  SELLER_ADD_PAYPAL_SUCCESS,
  SELLER_DELETE_BANK_FAIL,
  SELLER_DELETE_BANK_REQUEST,
  SELLER_DELETE_BANK_SUCCESS,
  SELLER_DELETE_PAYONEER_FAIL,
  SELLER_DELETE_PAYONEER_REQUEST,
  SELLER_DELETE_PAYONEER_SUCCESS,
  SELLER_DELETE_PAYPAL_FAIL,
  SELLER_DELETE_PAYPAL_REQUEST,
  SELLER_DELETE_PAYPAL_SUCCESS,
  SELLER_GET_BALANCE_FAIL,
  SELLER_GET_BALANCE_REQUEST,
  SELLER_GET_BALANCE_SUCCESS,
} from "../../constants/seller/seller-accounts.constants";
import { API_ROUTES } from "../../routes";
import {
  BankAccountType,
  PayoneerAccountType,
  PaypalAccountType,
} from "../../types/accounts.types";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";

export const sellerGetBalanceAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_GET_BALANCE_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.sellerAccounts?.getBalance +
          login?.serverResponse?.data?.id,
        config
      );
      dispatch({
        type: SELLER_GET_BALANCE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_GET_BALANCE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerAddBankAccountAction =
  ({
    account_number,
    account_name,
    bank_name,
    routing_number,
  }: BankAccountType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_ADD_BANK_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.sellerAccounts?.addBankAccount +
          login?.serverResponse?.data?.id,
        {
          account_number,
          account_name,
          bank_name,
          routing_number,
        },
        config
      );
      dispatch({
        type: SELLER_ADD_BANK_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_ADD_BANK_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerDeleteBankAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_DELETE_BANK_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.delete(
        API_ROUTES?.sellerAccounts?.deleteBankAccount +
          login?.serverResponse?.data?.id +
          "/" +
          id,
        config
      );
      dispatch({
        type: SELLER_DELETE_BANK_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_DELETE_BANK_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerAddPaypalAccountAction =
  ({ email }: PaypalAccountType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_ADD_PAYPAL_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.sellerAccounts?.addPayPalAccount +
          login?.serverResponse?.data?.id,
        {
          email,
        },
        config
      );
      dispatch({
        type: SELLER_ADD_PAYPAL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_ADD_PAYPAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerDeletePaypalAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_DELETE_PAYPAL_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.delete(
        API_ROUTES?.sellerAccounts?.deletePayPalAccount +
          login?.serverResponse?.data?.id +
          "/" +
          id,
        config
      );
      dispatch({
        type: SELLER_DELETE_PAYPAL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_DELETE_PAYPAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerAddPayoneerAccountAction =
  ({ email }: PayoneerAccountType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_ADD_PAYONEER_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.sellerAccounts?.addPayoneerAccount +
          login?.serverResponse?.data?.id,
        {
          email,
        },
        config
      );
      dispatch({
        type: SELLER_ADD_PAYONEER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_ADD_PAYONEER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerDeletePayoneerAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_DELETE_PAYONEER_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.delete(
        API_ROUTES?.sellerAccounts?.deletePayoneerAccount +
          login?.serverResponse?.data?.id +
          "/" +
          id,
        config
      );
      dispatch({
        type: SELLER_DELETE_PAYONEER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_DELETE_PAYONEER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
