import axios from "axios";
import { Dispatch } from "redux";
import { API_ROUTES } from "../../routes";
import {
  USER_GET_SERVICES_REQUEST,
  USER_GET_SERVICES_SUCCESS,
  USER_GET_SERVICES_FAIL,
  USER_GET_SERVICES_CATEGORY_FAIL,
  USER_GET_SERVICES_CATEGORY_REQUEST,
  USER_GET_SERVICES_CATEGORY_SUCCESS,
  USER_GET_SERVICE_BY_ID_FAIL,
  USER_GET_SERVICE_BY_ID_REQUEST,
  USER_GET_SERVICE_BY_ID_SUCCESS,
  USER_GET_NEW_SERVICES_FAIL,
  USER_GET_NEW_SERVICES_REQUEST,
  USER_GET_NEW_SERVICES_SUCCESS,
  USER_GET_TOP_RATED_SERVICES_FAIL,
  USER_GET_TOP_RATED_SERVICES_REQUEST,
  USER_GET_TOP_RATED_SERVICES_SUCCESS,
} from "../../constants/userDashboard/services.constants";
import { AdminGetServiceType } from "../../types/services.types";

export const userGetServicesAction =
  (query: string) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_GET_SERVICES_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userServices?.getServices + "?" + query,
        config
      );

      dispatch({ type: USER_GET_SERVICES_SUCCESS, payload: data });
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: USER_GET_SERVICES_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetNewServicesAction =
  (query: string) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_GET_NEW_SERVICES_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userServices?.getServices + "?" + query,
        config
      );

      dispatch({ type: USER_GET_NEW_SERVICES_SUCCESS, payload: data });
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: USER_GET_NEW_SERVICES_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetTopRatedServicesAction =
  (query: string) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_GET_TOP_RATED_SERVICES_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userServices?.getServices + "?" + query,
        config
      );

      dispatch({ type: USER_GET_TOP_RATED_SERVICES_SUCCESS, payload: data });
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: USER_GET_TOP_RATED_SERVICES_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetServiceByIdAction =
  (
    service_id: string,
    callback: React.Dispatch<
      React.SetStateAction<
        (AdminGetServiceType & { isProduct: boolean }) | undefined
      >
    >
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: USER_GET_SERVICE_BY_ID_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userServices?.getServiceById + service_id,
        config
      );

      dispatch({ type: USER_GET_SERVICE_BY_ID_SUCCESS, payload: data });
      callback(data.data);
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: USER_GET_SERVICE_BY_ID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetServiceCategoriesAction =
  () => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_GET_SERVICES_CATEGORY_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userServices?.getServiceCategories,
        config
      );
      dispatch({
        type: USER_GET_SERVICES_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_GET_SERVICES_CATEGORY_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
