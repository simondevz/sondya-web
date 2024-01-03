import axios from "axios";
import { Dispatch } from "redux";
import {
  HOME_PRODUCTS_CATEGORY_FAIL,
  HOME_PRODUCTS_CATEGORY_REQUEST,
  HOME_PRODUCTS_CATEGORY_SUCCESS,
  HOME_PRODUCTS_DETAIL_FAIL,
  HOME_PRODUCTS_DETAIL_REQUEST,
  HOME_PRODUCTS_DETAIL_SUCCESS,
  HOME_PRODUCTS_FAIL,
  HOME_PRODUCTS_REQUEST,
  HOME_PRODUCTS_SUCCESS,
  HOME_SERVICES_CATEGORY_FAIL,
  HOME_SERVICES_CATEGORY_REQUEST,
  HOME_SERVICES_CATEGORY_SUCCESS,
  HOME_SERVICES_DETAIL_FAIL,
  HOME_SERVICES_DETAIL_REQUEST,
  HOME_SERVICES_DETAIL_SUCCESS,
  HOME_SERVICES_FAIL,
  HOME_SERVICES_REQUEST,
  HOME_SERVICES_SUCCESS,
  YOU_MAY_LIKE_PRODUCTS_FAIL,
  YOU_MAY_LIKE_PRODUCTS_REQUEST,
  YOU_MAY_LIKE_PRODUCTS_SUCCESS,
  YOU_MAY_LIKE_SERVICES_FAIL,
  YOU_MAY_LIKE_SERVICES_REQUEST,
  YOU_MAY_LIKE_SERVICES_SUCCESS,
} from "../constants/home.constants";
import { API_ROUTES } from "../routes";

export const homeGetProductsAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: HOME_PRODUCTS_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.home?.products + "?" + query.toString(),
        config
      );

      dispatch({
        type: HOME_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: HOME_PRODUCTS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const homeGetServicesAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: HOME_SERVICES_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.home?.services + "?" + query.toString(),
        config
      );

      dispatch({
        type: HOME_SERVICES_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: HOME_SERVICES_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

type DetailsType = {
  id: string;
  name: string;
};

export const homeGetProductDetailsAction =
  ({ id, name }: DetailsType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: HOME_PRODUCTS_DETAIL_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.home?.productDetail + id + "/" + name,
        config
      );

      dispatch({
        type: HOME_PRODUCTS_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: HOME_PRODUCTS_DETAIL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const homeGetServiceDetailsAction =
  ({ id, name }: DetailsType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: HOME_SERVICES_DETAIL_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.home?.serviceDetail + id + "/" + name,
        config
      );

      dispatch({
        type: HOME_SERVICES_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: HOME_SERVICES_DETAIL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const homeGetServiceCategoryAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: HOME_SERVICES_CATEGORY_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.home?.servicesCategory,
        config
      );

      dispatch({
        type: HOME_SERVICES_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: HOME_SERVICES_CATEGORY_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const homeGetProductCategoryAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: HOME_PRODUCTS_CATEGORY_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.home?.productsCategory,
        config
      );

      dispatch({
        type: HOME_PRODUCTS_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: HOME_PRODUCTS_CATEGORY_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const youMayLikeProductsAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: YOU_MAY_LIKE_PRODUCTS_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.home?.products + "?" + query.toString(),
        config
      );

      dispatch({
        type: YOU_MAY_LIKE_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: YOU_MAY_LIKE_PRODUCTS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const youMayLikeServicesAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: YOU_MAY_LIKE_SERVICES_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.home?.services + "?" + query.toString(),
        config
      );

      dispatch({
        type: YOU_MAY_LIKE_SERVICES_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: YOU_MAY_LIKE_SERVICES_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
