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
} from "../../constants/userDashboard/services.constants";

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
        API_ROUTES?.users?.getServices + "?" + query,
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
        API_ROUTES?.users?.getServiceCategories,
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
