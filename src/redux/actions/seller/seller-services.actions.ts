import axios from "axios";
import { Dispatch } from "redux";
import {
  SELLER_CREATE_SERVICE_FAIL,
  SELLER_CREATE_SERVICE_REQUEST,
  SELLER_CREATE_SERVICE_SUCCESS,
  SELLER_DELETE_SERVICE_FAIL,
  SELLER_DELETE_SERVICE_REQUEST,
  SELLER_DELETE_SERVICE_SUCCESS,
  SELLER_GETBYID_SERVICE_FAIL,
  SELLER_GETBYID_SERVICE_REQUEST,
  SELLER_GETBYID_SERVICE_SUCCESS,
  SELLER_GET_ALL_SERVICE_FAIL,
  SELLER_GET_ALL_SERVICE_REQUEST,
  SELLER_GET_ALL_SERVICE_SUCCESS,
  SELLER_UPDATE_SERVICE_FAIL,
  SELLER_UPDATE_SERVICE_REQUEST,
  SELLER_UPDATE_SERVICE_SUCCESS,
} from "../../constants/seller/seller-services.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import {
  AdminCreateService,
  AdminUpdateService,
} from "../../types/services.types";

export const sellerCreateServiceAction =
  ({
    name,
    owner,
    category,
    brief_description,
    description,
    service_status,
    currency,
    old_price,
    current_price,
    percentage_price_off,
    duration,

    location_description,
    phone_number,
    phone_number_backup,
    email,
    website_link,
    country,
    state,
    city,
    map_location_link,
  }: AdminCreateService) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_CREATE_SERVICE_REQUEST,
      });

      const state1 = getState();
      const login: LoginResponseType = state1?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.sellerServices?.create,
        {
          name,
          owner,
          category,
          brief_description,
          description,
          service_status,
          currency,
          old_price,
          current_price,
          percentage_price_off,
          duration,

          location_description,
          phone_number,
          phone_number_backup,
          email,
          website_link,
          country,
          state,
          city,
          map_location_link,
        },
        config
      );
      dispatch({
        type: SELLER_CREATE_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_CREATE_SERVICE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerUpdateServiceAction =
  ({
    name,
    owner,
    category,
    brief_description,
    description,
    service_status,
    currency,
    old_price,
    current_price,
    percentage_price_off,
    duration,

    location_description,
    phone_number,
    phone_number_backup,
    email,
    website_link,
    country,
    state,
    city,
    map_location_link,

    id,
  }: AdminUpdateService) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_UPDATE_SERVICE_REQUEST,
      });

      const state1 = getState();
      const login: LoginResponseType = state1?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.sellerServices?.update + id,
        {
          name,
          owner,
          category,
          brief_description,
          description,
          service_status,
          currency,
          old_price,
          current_price,
          percentage_price_off,
          duration,

          location_description,
          phone_number,
          phone_number_backup,
          email,
          website_link,
          country,
          state,
          city,
          map_location_link,
        },
        config
      );
      dispatch({
        type: SELLER_UPDATE_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_UPDATE_SERVICE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerDeleteServiceAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_DELETE_SERVICE_REQUEST,
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
        API_ROUTES?.sellerServices?.delete + id,
        config
      );
      dispatch({
        type: SELLER_DELETE_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_DELETE_SERVICE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerGetServiceByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_GETBYID_SERVICE_REQUEST,
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
        API_ROUTES?.sellerServices?.getByID + id,
        config
      );
      dispatch({
        type: SELLER_GETBYID_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_GETBYID_SERVICE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const sellerGetServicesAction =
  ({ userId }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_GET_ALL_SERVICE_REQUEST,
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
        API_ROUTES?.sellerServices?.getAll + userId,
        config
      );
      dispatch({
        type: SELLER_GET_ALL_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_GET_ALL_SERVICE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
