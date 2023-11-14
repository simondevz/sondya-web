import axios from "axios";
import { Dispatch } from "redux";
import {
  SELLER_CREATE_PRODUCT_FAIL,
  SELLER_CREATE_PRODUCT_REQUEST,
  SELLER_CREATE_PRODUCT_SUCCESS,
  SELLER_DELETE_PRODUCT_FAIL,
  SELLER_DELETE_PRODUCT_REQUEST,
  SELLER_DELETE_PRODUCT_SUCCESS,
  SELLER_GETBYID_PRODUCT_FAIL,
  SELLER_GETBYID_PRODUCT_REQUEST,
  SELLER_GETBYID_PRODUCT_SUCCESS,
  SELLER_GET_ALL_PRODUCT_FAIL,
  SELLER_GET_ALL_PRODUCT_REQUEST,
  SELLER_GET_ALL_PRODUCT_SUCCESS,
  SELLER_UPDATE_PRODUCT_FAIL,
  SELLER_UPDATE_PRODUCT_REQUEST,
  SELLER_UPDATE_PRODUCT_SUCCESS,
} from "../../constants/seller/seller-products.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import {
  AdminCreateProduct,
  AdminUpdateProduct,
} from "../../types/products.types";

export const sellerCreateProductAction =
  ({
    name,
    category,
    description,
    total_stock,
    tag,
    brand,
    model,
    current_price,
    product_status,

    old_price,
    discount_percentage,
    vat_percentage,
    total_variants,
  }: AdminCreateProduct) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_CREATE_PRODUCT_REQUEST,
      });

      const state = getState();
      const login: LoginResponseType = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.sellerProducts?.create,
        {
          name,
          category,
          description,
          total_stock,
          tag,
          brand,
          model,
          current_price,
          product_status,

          old_price,
          discount_percentage,
          vat_percentage,
          total_variants,
        },
        config
      );
      dispatch({
        type: SELLER_CREATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_CREATE_PRODUCT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerUpdateProductAction =
  ({
    name,
    category,
    description,
    total_stock,
    tag,
    brand,
    model,
    current_price,
    product_status,

    old_price,
    discount_percentage,
    vat_percentage,
    total_variants,

    id,
  }: AdminUpdateProduct) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_UPDATE_PRODUCT_REQUEST,
      });

      const state = getState();
      const login: LoginResponseType = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.sellerProducts?.update + id,
        {
          name,
          category,
          description,
          total_stock,
          tag,
          brand,
          model,
          current_price,
          product_status,

          old_price,
          discount_percentage,
          vat_percentage,
          total_variants,
        },
        config
      );
      dispatch({
        type: SELLER_UPDATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_UPDATE_PRODUCT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerDeleteProductAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_DELETE_PRODUCT_REQUEST,
      });

      const state = getState();
      const login: LoginResponseType = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.token}`,
        },
      };

      const { data } = await axios.delete(
        API_ROUTES?.sellerProducts?.delete + id,
        config
      );
      dispatch({
        type: SELLER_DELETE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_DELETE_PRODUCT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerGetProductByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_GETBYID_PRODUCT_REQUEST,
      });

      const state = getState();
      const login: LoginResponseType = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.sellerProducts?.getByID + id,
        config
      );
      dispatch({
        type: SELLER_GETBYID_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_GETBYID_PRODUCT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerGetProductsAction =
  ({ userId }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_GET_ALL_PRODUCT_REQUEST,
      });

      const state = getState();
      const login: LoginResponseType = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.sellerProducts?.getAll + userId,
        config
      );
      dispatch({
        type: SELLER_GET_ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_GET_ALL_PRODUCT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
