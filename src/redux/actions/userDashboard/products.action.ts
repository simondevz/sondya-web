import axios from "axios";
import { Dispatch } from "redux";
import {
  USER_GET_PRODUCTS_REQUEST,
  USER_GET_PRODUCTS_SUCCESS,
  USER_GET_PRODUCTS_FAIL,
  USER_GET_PRODUCTS_CATEGORY_FAIL,
  USER_GET_PRODUCTS_CATEGORY_REQUEST,
  USER_GET_PRODUCTS_CATEGORY_SUCCESS,
  USER_GET_PRODUCT_BY_ID_FAIL,
  USER_GET_PRODUCT_BY_ID_REQUEST,
  USER_GET_PRODUCT_BY_ID_SUCCESS,
} from "../../constants/userDashboard/products.constants";
import { API_ROUTES } from "../../routes";

export const userGetProductsAction =
  (query: string) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_GET_PRODUCTS_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userProducts?.getProducts + "?" + query,
        config
      );

      dispatch({ type: USER_GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: USER_GET_PRODUCTS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetProductByIdAction =
  (product_id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_GET_PRODUCT_BY_ID_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userProducts?.getProductById + product_id,
        config
      );

      dispatch({ type: USER_GET_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: USER_GET_PRODUCT_BY_ID_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetProductsCategoriesAction =
  () => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_GET_PRODUCTS_CATEGORY_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userProducts?.getProductCategories,
        config
      );
      dispatch({
        type: USER_GET_PRODUCTS_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_GET_PRODUCTS_CATEGORY_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
