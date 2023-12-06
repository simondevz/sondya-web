import axios from "axios";
import { Dispatch } from "redux";
import {
  HOME_PRODUCTS_FAIL,
  HOME_PRODUCTS_REQUEST,
  HOME_PRODUCTS_SUCCESS,
  HOME_SERVICES_FAIL,
  HOME_SERVICES_REQUEST,
  HOME_SERVICES_SUCCESS,
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
