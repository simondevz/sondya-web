import axios from "axios";
import { Dispatch } from "redux";
import {
  CREATE_PRODUCT_ORDER_FAIL,
  CREATE_PRODUCT_ORDER_REQUEST,
  CREATE_PRODUCT_ORDER_SUCCESS,
  GET_PRODUCTS_ORDERS_FAIL,
  GET_PRODUCTS_ORDERS_REQUEST,
  GET_PRODUCTS_ORDERS_SUCCESS,
  GET_PRODUCTS_ORDER_BYID_FAIL,
  GET_PRODUCTS_ORDER_BYID_REQUEST,
  GET_PRODUCTS_ORDER_BYID_SUCCESS,
} from "../../constants/userDashboard/productsOrder.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { CheckoutType } from "../../types/checkout.types";
import { ReduxResponseType } from "../../types/general.types";

export const userCreateProductOrderAction =
  ({
    buyer,
    checkout_items,
    shipping_destination,
    payment_method,
    payment_status,
    total_amount,
    currency,
    order_status,
    redirect_url,
    total_tax,
    total_shipping_fee,
    total_discount,
  }: CheckoutType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: CREATE_PRODUCT_ORDER_REQUEST,
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
        API_ROUTES?.userProductsOrders?.createProductsOrders,
        {
          buyer,
          checkout_items,
          shipping_destination,
          payment_method,
          payment_status,
          total_amount,
          currency,
          order_status,
          redirect_url,
          total_tax,
          total_shipping_fee,
          total_discount,
        },
        config
      );
      dispatch({
        type: CREATE_PRODUCT_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: CREATE_PRODUCT_ORDER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetProductsOrdersAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_PRODUCTS_ORDERS_REQUEST,
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
        API_ROUTES?.userProductsOrders?.getProductsOrders +
          login?.serverResponse?.data?.id +
          "/?" +
          query.toString(),
        config
      );
      dispatch({
        type: GET_PRODUCTS_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_PRODUCTS_ORDERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetProductsOrderByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_PRODUCTS_ORDER_BYID_REQUEST,
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
        API_ROUTES?.userProductsOrders?.ProductOrdersById + id,
        config
      );
      dispatch({
        type: GET_PRODUCTS_ORDER_BYID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_PRODUCTS_ORDER_BYID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
