import axios from "axios";
import { Dispatch } from "redux";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import {
  ADMIN_DELETE_SERVICE_ORDER_BYID_FAIL,
  ADMIN_DELETE_SERVICE_ORDER_BYID_REQUEST,
  ADMIN_DELETE_SERVICE_ORDER_BYID_SUCCESS,
  ADMIN_GET_SERVICE_ORDERS_FAIL,
  ADMIN_GET_SERVICE_ORDERS_REQUEST,
  ADMIN_GET_SERVICE_ORDERS_SUCCESS,
  ADMIN_GET_SERVICE_ORDER_BYID_FAIL,
  ADMIN_GET_SERVICE_ORDER_BYID_REQUEST,
  ADMIN_GET_SERVICE_ORDER_BYID_SUCCESS,
} from "../../constants/admin/serviceOrder.constants";

export const adminGetServiceOrdersAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_SERVICE_ORDERS_REQUEST,
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
        API_ROUTES?.adminServiceOrders?.getServiceOrders +
          "?" +
          query.toString(),
        config
      );
      dispatch({
        type: ADMIN_GET_SERVICE_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_SERVICE_ORDERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetServiceOrderByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_SERVICE_ORDER_BYID_REQUEST,
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
        API_ROUTES?.adminServiceOrders?.getServiceOrdersById + id,
        config
      );

      dispatch({
        type: ADMIN_GET_SERVICE_ORDER_BYID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_SERVICE_ORDER_BYID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminDeleteServiceOrderByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_DELETE_SERVICE_ORDER_BYID_REQUEST,
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
        API_ROUTES?.adminServiceOrders?.deleteServiceOrdersById + id,
        config
      );
      dispatch({
        type: ADMIN_DELETE_SERVICE_ORDER_BYID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_DELETE_SERVICE_ORDER_BYID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
