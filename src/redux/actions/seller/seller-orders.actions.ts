import axios from "axios";
import { Dispatch } from "redux";
import {
  SELLER_DELETE_PRODUCTS_ORDER_BYID_FAIL,
  SELLER_DELETE_PRODUCTS_ORDER_BYID_REQUEST,
  SELLER_DELETE_PRODUCTS_ORDER_BYID_SUCCESS,
  SELLER_GET_PRODUCTS_ORDERS_FAIL,
  SELLER_GET_PRODUCTS_ORDERS_REQUEST,
  SELLER_GET_PRODUCTS_ORDERS_SUCCESS,
  SELLER_GET_PRODUCTS_ORDER_BYID_FAIL,
  SELLER_GET_PRODUCTS_ORDER_BYID_REQUEST,
  SELLER_GET_PRODUCTS_ORDER_BYID_SUCCESS,
} from "../../constants/seller/seller-orders.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";

export const sellerGetProductsOrdersAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_GET_PRODUCTS_ORDERS_REQUEST,
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
        API_ROUTES?.sellerProductsOrders?.getProductsOrders +
          "?" +
          query.toString(),
        config
      );
      dispatch({
        type: SELLER_GET_PRODUCTS_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_GET_PRODUCTS_ORDERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerGetProductsOrderByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_GET_PRODUCTS_ORDER_BYID_REQUEST,
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
        API_ROUTES?.sellerProductsOrders?.getProductOrdersById + id,
        config
      );
      dispatch({
        type: SELLER_GET_PRODUCTS_ORDER_BYID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_GET_PRODUCTS_ORDER_BYID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerDeleteProductsOrderByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_DELETE_PRODUCTS_ORDER_BYID_REQUEST,
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
        API_ROUTES?.sellerProductsOrders?.deleteProductOrdersById + id,
        config
      );
      dispatch({
        type: SELLER_DELETE_PRODUCTS_ORDER_BYID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_DELETE_PRODUCTS_ORDER_BYID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
