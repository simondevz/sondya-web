import axios from "axios";
import { Dispatch } from "redux";
import {
  CREATE_SERVICE_ORDER_FAIL,
  CREATE_SERVICE_ORDER_REQUEST,
  CREATE_SERVICE_ORDER_SUCCESS,
  GET_SERVICE_ORDERS_FAIL,
  GET_SERVICE_ORDERS_REQUEST,
  GET_SERVICE_ORDERS_SUCCESS,
  GET_SERVICE_ORDER_BYID_FAIL,
  GET_SERVICE_ORDER_BYID_REQUEST,
  GET_SERVICE_ORDER_BYID_SUCCESS,
  UPDATE_SERVICE_ORDERS_FAIL,
  UPDATE_SERVICE_ORDERS_REQUEST,
  UPDATE_SERVICE_ORDERS_SUCCESS,
  UPDATE_TERMS_FAIL,
  UPDATE_TERMS_REQUEST,
  UPDATE_TERMS_SUCCESS,
} from "../../constants/userDashboard/serviceOrder.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import {
  CreateServiceOrderType,
  ServiceOrderType,
  TermsType,
} from "../../types/serviceOrders.types";

export const getServiceOrderByIdAction =
  ({ order_id }: { order_id: string }) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      dispatch({
        type: GET_SERVICE_ORDER_BYID_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userServiceOrders?.getServiceOrderById + order_id,
        config
      );

      dispatch({
        type: GET_SERVICE_ORDER_BYID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_SERVICE_ORDER_BYID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const getServiceOrdersAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      const buyer_id = login.serverResponse.data.id;
      dispatch({
        type: GET_SERVICE_ORDERS_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userServiceOrders?.getUserServiceOrders + buyer_id,
        config
      );

      dispatch({
        type: GET_SERVICE_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_SERVICE_ORDERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const createServiceOrderAction =
  (serviceOrder: CreateServiceOrderType, phone_number: string) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      serviceOrder.buyer = {
        id: login?.serverResponse?.data?.id,
        email: login?.serverResponse?.data?.email,
        username: login?.serverResponse?.data?.username || "",
        phone: phone_number,
      };

      dispatch({
        type: CREATE_SERVICE_ORDER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.userServiceOrders?.createServiceOrder +
          serviceOrder?.checkout_items?._id,
        { serviceOrder },
        config
      );
      dispatch({
        type: CREATE_SERVICE_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: CREATE_SERVICE_ORDER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const updateTermsAction =
  (
    order_id: string,
    {
      amount,
      duration,
      durationUnit,
      acceptedByBuyer,
      acceptedBySeller,
      rejectedByBuyer,
      rejectedBySeller,
    }: TermsType
  ) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      dispatch({
        type: UPDATE_TERMS_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.userServiceOrders?.updateTerms + order_id,
        {
          amount,
          duration,
          durationUnit,
          acceptedByBuyer,
          acceptedBySeller,
          rejectedByBuyer,
          rejectedBySeller,
        },
        config
      );
      dispatch({
        type: UPDATE_TERMS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      // console.log(error);
      dispatch({
        type: UPDATE_TERMS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const updateServiceOrderAction =
  (serviceOrder: ServiceOrderType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      dispatch({
        type: UPDATE_SERVICE_ORDERS_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.userServiceOrders?.updateServiceOrder +
          serviceOrder?.order_id,
        {
          serviceOrder,
        },
        config
      );
      dispatch({
        type: UPDATE_SERVICE_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      // console.log(error);
      dispatch({
        type: UPDATE_SERVICE_ORDERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
