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
import { ReduxResponseType } from "../../types/general.types";
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
    image,
  }: AdminCreateService) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_CREATE_SERVICE_REQUEST,
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
        API_ROUTES?.sellerServices?.create,
        FD,
        config
      );

      console.log(data);
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
        type: SELLER_UPDATE_SERVICE_REQUEST,
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
        API_ROUTES?.sellerServices?.update + id,
        FD,
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
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
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
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
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
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_GET_ALL_SERVICE_REQUEST,
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
        API_ROUTES?.sellerServices?.getAll +
          login?.serverResponse?.data?.id +
          "?" +
          query,
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
