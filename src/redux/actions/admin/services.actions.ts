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
    user,
    category,
    brief_description,
    description,
    tag,
    current_price,
    service_status,
  }: AdminCreateService) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_CREATE_SERVICE_REQUEST,
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
        API_ROUTES?.adminServices?.create,
        {
          name,
          user,
          category,
          brief_description,
          description,
          tag,
          current_price,
          service_status,
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
    user,
    category,
    brief_description,
    description,
    tag,
    current_price,
    service_status,
    id,
  }: AdminUpdateService) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_UPDATE_SERVICE_REQUEST,
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
        API_ROUTES?.adminServices?.update + id,
        {
          name,
          user,
          category,
          brief_description,
          description,
          tag,
          current_price,
          service_status,
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
        API_ROUTES?.adminServices?.getByID,
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
