import axios from "axios";
import { Dispatch } from "redux";
import {
  CREATE_SERVICE_ORDER_FAIL,
  CREATE_SERVICE_ORDER_REQUEST,
  CREATE_SERVICE_ORDER_SUCCESS,
  UPDATE_TERMS_SUCCESS,
  UPDATE_TERMS_FAIL,
  UPDATE_TERMS_REQUEST,
  GET_SERVICE_ORDER_BYID_FAIL,
  GET_SERVICE_ORDER_BYID_REQUEST,
  GET_SERVICE_ORDER_BYID_SUCCESS,
} from "../../constants/userDashboard/serviceOrder.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import {
  CreateServiceOrderType,
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

export const createServiceOrderAction =
  ({ service_id, seller }: CreateServiceOrderType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
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
        API_ROUTES?.userServiceOrders?.createServiceOrder + service_id,
        {
          buyer: {
            id: login?.serverResponse?.data?.id,
            email: login?.serverResponse?.data?.email,
            username: login?.serverResponse?.data?.username,
          },
          seller,
        },
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
  ({
    order_id,
    amount,
    advance,
    duration,
    durationUnit,
    acceptedByBuyer,
    acceptedBySeller,
    rejectedByBuyer,
    rejectedBySeller,
  }: TermsType) =>
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
          advance,
          duration,
          durationUnit,
          acceptedByBuyer,
          acceptedBySeller,
          rejectedByBuyer,
          rejectedBySeller,
        },
        config
      );
      console.log(data);
      dispatch({
        type: UPDATE_TERMS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.log(error);

      dispatch({
        type: UPDATE_TERMS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
