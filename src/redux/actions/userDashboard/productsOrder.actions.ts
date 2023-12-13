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
    checkoutItems,
    subTotal,
    shippingFee,
    tax,
    discount,
    totalAmount,
    currency,
    buyer,
    ShippingDestination,
    paymentMethod,
    Category,
    paymentStatus,
    orderStatus,
    callback_url,
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
          checkoutItems,
          subTotal,
          shippingFee,
          tax,
          discount,
          totalAmount,
          currency,
          buyer,
          ShippingDestination,
          paymentMethod,
          Category,
          paymentStatus,
          orderStatus,
          callback_url,
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
          "?" +
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
        API_ROUTES?.userProductsOrders?.getProductOrdersById + id,
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
