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
import { ReduxResponseType } from "../../types/general.types";
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
    image,
  }: AdminCreateService) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_CREATE_SERVICE_REQUEST,
      });

      const state1 = getState();
      const login: ReduxResponseType<LoginResponseType> = state1?.login;

      // load data for flight
      let FD: FormData = new FormData();
      FD.append("name", name);
      owner && FD.append("owner", JSON.stringify(owner));
      FD.append("category", category);
      FD.append("brief_description", brief_description);
      FD.append("description", description);
      FD.append("service_status", service_status);
      FD.append("currency", currency);
      FD.append("old_price", old_price.toString());
      FD.append("current_price", current_price.toString());
      percentage_price_off &&
        FD.append("percentage_price_off", percentage_price_off.toString());
      FD.append("duration", duration);
      FD.append("location_description", location_description);
      FD.append("phone_number", phone_number);
      FD.append("phone_number_backup", phone_number_backup);
      FD.append("email", email);
      FD.append("website_link", website_link);
      FD.append("country", country);
      FD.append("state", state);
      FD.append("city", city);
      FD.append("map_location_link", map_location_link);
      if (image && Array.isArray(image) && image.length >= 1) {
        image.forEach((file) => FD.append("image", file as File));
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.adminServices?.create,
        FD,
        config
      );
      dispatch({
        type: ADMIN_CREATE_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      // console.log(error);
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
  (
    {
      name,
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
      image,

      id,
    }: AdminUpdateService,
    deleteImageId: string[]
  ) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_UPDATE_SERVICE_REQUEST,
      });
      const state1 = getState();
      const login: ReduxResponseType<LoginResponseType> = state1?.login;

      // load data for flight
      let FD: FormData = new FormData();
      FD.append("name", name);
      FD.append("category", category);
      FD.append("brief_description", brief_description);
      FD.append("description", description);
      FD.append("service_status", service_status);
      FD.append("currency", currency);
      old_price && FD.append("old_price", old_price.toString());
      current_price && FD.append("current_price", current_price.toString());
      percentage_price_off &&
        FD.append("percentage_price_off", percentage_price_off.toString());
      FD.append("duration", duration.toString());

      FD.append("location_description", location_description);
      FD.append("phone_number", phone_number);
      FD.append("email", email);
      FD.append("phone_number_backup", phone_number_backup);
      FD.append("website_link", website_link);
      FD.append("country", country);
      FD.append("state", state);
      FD.append("city", city);
      FD.append("map_location_link", map_location_link);
      FD.append("deleteImageId", JSON.stringify(deleteImageId));

      if (image && Array.isArray(image) && image.length >= 1) {
        image.forEach((file) => FD.append("image", file as File));
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.adminServices?.update + id,
        FD,
        config
      );

      dispatch({
        type: ADMIN_UPDATE_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.log(error);
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
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
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
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
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
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_ALL_SERVICE_REQUEST,
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
        API_ROUTES?.adminServices?.getAll + "?" + query.toString(),
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
