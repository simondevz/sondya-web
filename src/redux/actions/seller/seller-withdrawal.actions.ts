import axios from "axios";
import { Dispatch } from "redux";
import {
  SELLER_DELETE_WITHDRAWAL_FAIL,
  SELLER_DELETE_WITHDRAWAL_REQUEST,
  SELLER_DELETE_WITHDRAWAL_SUCCESS,
  SELLER_GET_WITHDRAWALS_FAIL,
  SELLER_GET_WITHDRAWALS_REQUEST,
  SELLER_GET_WITHDRAWALS_SUCCESS,
  SELLER_GET_WITHDRAWAL_BYID_FAIL,
  SELLER_GET_WITHDRAWAL_BYID_REQUEST,
  SELLER_GET_WITHDRAWAL_BYID_SUCCESS,
  SELLER_WITHDRAWAL_FAIL,
  SELLER_WITHDRAWAL_REQUEST,
  SELLER_WITHDRAWAL_SUCCESS,
} from "../../constants/seller/seller-withdrawals.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import { SellerWithdrawalType } from "../../types/withdrawal.types";

export const sellerWithdrawAction =
  ({
    user,
    currency,
    withdrawal_amount,
    withdrawal_mode,
    withdrawal_account,
  }: SellerWithdrawalType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_WITHDRAWAL_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.sellerWithdrawal?.withdraw,
        {
          user,
          currency,
          withdrawal_amount,
          withdrawal_mode,
          withdrawal_account,
        },
        config
      );
      dispatch({
        type: SELLER_WITHDRAWAL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_WITHDRAWAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerGetWithdrawalsAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_GET_WITHDRAWALS_REQUEST,
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
        API_ROUTES?.sellerWithdrawal?.getWithdrawals +
          login?.serverResponse?.data?.id +
          "?" +
          query.toString(),
        config
      );
      dispatch({
        type: SELLER_GET_WITHDRAWALS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_GET_WITHDRAWALS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerGetWithdrawalByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_GET_WITHDRAWAL_BYID_REQUEST,
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
        API_ROUTES?.sellerWithdrawal?.getWithdrawalById + id,
        config
      );
      dispatch({
        type: SELLER_GET_WITHDRAWAL_BYID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_GET_WITHDRAWAL_BYID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerDeleteWithdrawalAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_DELETE_WITHDRAWAL_REQUEST,
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
        API_ROUTES?.sellerWithdrawal?.deleteWithdrawal + id,
        config
      );
      dispatch({
        type: SELLER_DELETE_WITHDRAWAL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_DELETE_WITHDRAWAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
