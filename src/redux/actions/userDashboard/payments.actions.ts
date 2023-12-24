import axios from "axios";
import { Dispatch } from "redux";
import {
  GET_USER_PAYMENTS_BYID_FAIL,
  GET_USER_PAYMENTS_BYID_REQUEST,
  GET_USER_PAYMENTS_BYID_SUCCESS,
  GET_USER_PAYMENTS_FAIL,
  GET_USER_PAYMENTS_REQUEST,
  GET_USER_PAYMENTS_SUCCESS,
  INITIALIZE_PAYMENTS_FAIL,
  INITIALIZE_PAYMENTS_REQUEST,
  INITIALIZE_PAYMENTS_SUCCESS,
  VERIFY_PAYMENTS_FAIL,
  VERIFY_PAYMENTS_REQUEST,
  VERIFY_PAYMENTS_SUCCESS,
} from "../../constants/userDashboard/payments.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import { PaymentRequestType } from "../../types/payments.types";

export const userGetPaymentsAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_USER_PAYMENTS_REQUEST,
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
        API_ROUTES?.userPayments?.getUserPayments +
          login?.serverResponse?.data?.id,
        config
      );
      dispatch({
        type: GET_USER_PAYMENTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_USER_PAYMENTS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetPaymentByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_USER_PAYMENTS_BYID_REQUEST,
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
        API_ROUTES?.userPayments?.getUserPaymentsById + id,
        config
      );
      dispatch({
        type: GET_USER_PAYMENTS_BYID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_USER_PAYMENTS_BYID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const initializePaymentsAction =
  ({ buyer, amount, currency, redirect_url }: PaymentRequestType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: INITIALIZE_PAYMENTS_REQUEST,
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
        API_ROUTES?.userPayments?.initializePayment,
        { buyer, amount, currency, redirect_url },
        config
      );
      dispatch({
        type: INITIALIZE_PAYMENTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: INITIALIZE_PAYMENTS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const verifyPaymentsAction =
  ({ tx_ref }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: VERIFY_PAYMENTS_REQUEST,
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
        API_ROUTES?.userPayments?.verifyPayment + tx_ref,
        config
      );

      dispatch({
        type: VERIFY_PAYMENTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: VERIFY_PAYMENTS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
