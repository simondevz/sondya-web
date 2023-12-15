import axios from "axios";
import { Dispatch } from "redux";
import {
  GET_ADMIN_PAYMENTS_BYID_FAIL,
  GET_ADMIN_PAYMENTS_BYID_REQUEST,
  GET_ADMIN_PAYMENTS_BYID_SUCCESS,
  GET_ADMIN_PAYMENTS_FAIL,
  GET_ADMIN_PAYMENTS_REQUEST,
  GET_ADMIN_PAYMENTS_SUCCESS,
} from "../../constants/admin/payments.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";

export const adminGetPaymentsAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_ADMIN_PAYMENTS_REQUEST,
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
        API_ROUTES?.adminPayments?.getAdminPayments + "?" + query.toString(),
        config
      );
      dispatch({
        type: GET_ADMIN_PAYMENTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_ADMIN_PAYMENTS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetPaymentByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_ADMIN_PAYMENTS_BYID_REQUEST,
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
        API_ROUTES?.adminPayments?.getAdminPaymentsById + id,
        config
      );
      dispatch({
        type: GET_ADMIN_PAYMENTS_BYID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_ADMIN_PAYMENTS_BYID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
