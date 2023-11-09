import axios from "axios";
import { Dispatch } from "redux";
import {
  ADMIN_CREATE_SERVICE_FAIL,
  ADMIN_CREATE_SERVICE_REQUEST,
  ADMIN_CREATE_SERVICE_SUCCESS,
  ADMIN_DELETE_SERVICE_FAIL,
  ADMIN_DELETE_SERVICE_REQUEST,
  ADMIN_DELETE_SERVICE_SUCCESS,
  ADMIN_GETBYID_SERVICE_FAIL,
  ADMIN_GETBYID_SERVICE_REQUEST,
  ADMIN_GETBYID_SERVICE_SUCCESS,
  ADMIN_GET_ALL_SERVICE_FAIL,
  ADMIN_GET_ALL_SERVICE_REQUEST,
  ADMIN_GET_ALL_SERVICE_SUCCESS,
  ADMIN_UPDATE_SERVICE_FAIL,
  ADMIN_UPDATE_SERVICE_REQUEST,
  ADMIN_UPDATE_SERVICE_SUCCESS,
} from "../../constants/admin/services.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import {
  AdminCreateService,
  AdminUpdateService,
} from "../../types/services.types";

export const adminCreateServiceAction =
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
        type: ADMIN_CREATE_SERVICE_REQUEST,
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
        API_ROUTES?.adminServices?.create,
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
        type: ADMIN_CREATE_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_CREATE_SERVICE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminUpdateServiceAction =
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
        type: ADMIN_UPDATE_SERVICE_REQUEST,
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
        API_ROUTES?.adminServices?.update + id,
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
        type: ADMIN_UPDATE_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_UPDATE_SERVICE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminDeleteServiceAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_DELETE_SERVICE_REQUEST,
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
        API_ROUTES?.adminServices?.delete + id,
        config
      );
      dispatch({
        type: ADMIN_DELETE_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_DELETE_SERVICE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetServiceByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GETBYID_SERVICE_REQUEST,
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
        API_ROUTES?.adminServices?.getByID + id,
        config
      );
      dispatch({
        type: ADMIN_GETBYID_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GETBYID_SERVICE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetServicesAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_ALL_SERVICE_REQUEST,
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
        API_ROUTES?.adminServices?.getAll,
        config
      );
      dispatch({
        type: ADMIN_GET_ALL_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_ALL_SERVICE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
