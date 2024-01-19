import axios from "axios";
import { Dispatch } from "redux";
import {
  ADMIN_ANALYTICS_TOPPRODUCTS_REQUEST,
  ADMIN_ANALYTICS_TOPPRODUCTS_SUCCESS,
  ADMIN_ANALYTICS_TOPPRODUCTS_FAIL,
  ADMIN_ANALYTICS_TOPSERVICES_REQUEST,
  ADMIN_ANALYTICS_TOPSERVICES_SUCCESS,
  ADMIN_ANALYTICS_TOPSERVICES_FAIL,
  ADMIN_ANALYTICS_REVENUE_AND_ORDER_REQUEST,
  ADMIN_ANALYTICS_REVENUE_AND_ORDER_SUCCESS,
  ADMIN_ANALYTICS_REVENUE_AND_ORDER_FAIL,
  ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_FAIL,
  ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_REQUEST,
  ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_SUCCESS,
  ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_FAIL,
  ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_REQUEST,
  ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_SUCCESS,
  ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_SUCCESS,
  ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_FAIL,
  ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_REQUEST,
} from "../../constants/admin/analytics.constatnts";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";

export const adminAnalytictsTopProductsAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_ANALYTICS_TOPPRODUCTS_REQUEST,
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
        API_ROUTES?.adminAnalytics?.topProducts,
        config
      );
      dispatch({
        type: ADMIN_ANALYTICS_TOPPRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_ANALYTICS_TOPPRODUCTS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminAnalytictsTopServicesAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_ANALYTICS_TOPSERVICES_REQUEST,
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
        API_ROUTES?.adminAnalytics?.topServices,
        config
      );
      dispatch({
        type: ADMIN_ANALYTICS_TOPSERVICES_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_ANALYTICS_TOPSERVICES_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminAnalytictsLatestProductOrdersAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_REQUEST,
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
        API_ROUTES?.adminAnalytics?.latestProductOrders,
        config
      );
      dispatch({
        type: ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminAnalytictsLatestServiceOrdersAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_REQUEST,
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
        API_ROUTES?.adminAnalytics?.latestServiceOrders,
        config
      );
      dispatch({
        type: ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminAnalyticsRevenuAndOrderAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_ANALYTICS_REVENUE_AND_ORDER_REQUEST,
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
        API_ROUTES?.adminAnalytics?.revenueOrderAnalytics,
        config
      );
      dispatch({
        type: ADMIN_ANALYTICS_REVENUE_AND_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_ANALYTICS_REVENUE_AND_ORDER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminAnalyticsVisitorsAndConversionsAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_REQUEST,
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
        API_ROUTES?.adminAnalytics?.vistorConversionsAnalytics,
        config
      );
      dispatch({
        type: ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
