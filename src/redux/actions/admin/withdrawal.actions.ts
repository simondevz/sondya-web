import axios from "axios";
import { Dispatch } from "redux";
import {
  ADMIN_DELETE_WITHDRAWAL_FAIL,
  ADMIN_DELETE_WITHDRAWAL_REQUEST,
  ADMIN_DELETE_WITHDRAWAL_SUCCESS,
  ADMIN_GET_WITHDRAWALS_FAIL,
  ADMIN_GET_WITHDRAWALS_REQUEST,
  ADMIN_GET_WITHDRAWALS_SUCCESS,
  ADMIN_GET_WITHDRAWAL_BYID_FAIL,
  ADMIN_GET_WITHDRAWAL_BYID_REQUEST,
  ADMIN_GET_WITHDRAWAL_BYID_SUCCESS,
  ADMIN_PENDING_WITHDRAWAL_FAIL,
  ADMIN_PENDING_WITHDRAWAL_REQUEST,
  ADMIN_PENDING_WITHDRAWAL_SUCCESS,
  ADMIN_WITHDRAWAL_PAYMENT_FAIL,
  ADMIN_WITHDRAWAL_PAYMENT_REQUEST,
  ADMIN_WITHDRAWAL_PAYMENT_SUCCESS,
} from "../../constants/admin/admin-withdrawal.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import { AdminWithdrawalPaymentType } from "../../types/withdrawal.types";

export const adminWithdrawalPaymentAction =
  ({ withdrawal_status, withdrawal_amount, id }: AdminWithdrawalPaymentType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_WITHDRAWAL_PAYMENT_REQUEST,
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
        API_ROUTES?.adminWithdrawalPayment?.adminMakePayment + id,
        { withdrawal_status, withdrawal_amount },
        config
      );
      dispatch({
        type: ADMIN_WITHDRAWAL_PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_WITHDRAWAL_PAYMENT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetPendingWithdrawalsAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_PENDING_WITHDRAWAL_REQUEST,
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
        API_ROUTES?.adminWithdrawalPayment?.AdminGetPendingWithdrawals +
          "?" +
          query.toString(),
        config
      );
      dispatch({
        type: ADMIN_PENDING_WITHDRAWAL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_PENDING_WITHDRAWAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetWithdrawalsAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_WITHDRAWALS_REQUEST,
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
        API_ROUTES?.adminWithdrawalPayment?.AdminGetWithdrawals +
          "?" +
          query.toString(),
        config
      );
      dispatch({
        type: ADMIN_GET_WITHDRAWALS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_WITHDRAWALS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetWithdrawalByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_WITHDRAWAL_BYID_REQUEST,
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
        API_ROUTES?.adminWithdrawalPayment?.AdminGetWithdrawalById + id,
        config
      );
      dispatch({
        type: ADMIN_GET_WITHDRAWAL_BYID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_WITHDRAWAL_BYID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminDeleteWithdrawalAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_DELETE_WITHDRAWAL_REQUEST,
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
        API_ROUTES?.adminWithdrawalPayment?.AdminDeleteWithdrawal + id,
        config
      );
      dispatch({
        type: ADMIN_DELETE_WITHDRAWAL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_DELETE_WITHDRAWAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
