import axios from "axios";
import { Dispatch } from "redux";
import {
  ADMIN_CREATE_USER_FAIL,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_GETBYID_USER_FAIL,
  ADMIN_GETBYID_USER_REQUEST,
  ADMIN_GETBYID_USER_SUCCESS,
  ADMIN_GET_ALL_USERS_FAIL,
  ADMIN_GET_ALL_USERS_REQUEST,
  ADMIN_GET_ALL_USERS_SUCCESS,
  ADMIN_GET_USER_ORDERS_FAIL,
  ADMIN_GET_USER_ORDERS_REQUEST,
  ADMIN_GET_USER_ORDERS_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
} from "../../constants/admin/users.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import {
  adminCreateUserType,
  adminUpdateUserType,
  adminUsersId,
} from "../../types/users.types";

export const adminCreateUserAction =
  ({
    first_name,
    last_name,
    email,
    password,
    username,
    country,
  }: adminCreateUserType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_CREATE_USER_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.adminUsers?.create,
        { first_name, last_name, email, username, password, country },
        config
      );
      dispatch({
        type: ADMIN_CREATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_CREATE_USER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminUpdateUserAction =
  ({
    first_name,
    last_name,
    username,
    email,
    password,
    type,
    phone_number,
    address,
    state,
    country,
    zip_code,
    status,

    // social media
    facebook_url,
    linkedin_url,
    youtube_url,
    instagram_url,
    twitter_url,
    tiktok_url,

    //new
    city,
    currency,
    language,

    //company details
    company_details,

    // id for query
    id,
  }: adminUpdateUserType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_UPDATE_USER_REQUEST,
      });

      const state1 = getState();
      const login: ReduxResponseType<LoginResponseType> = state1?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.adminUsers?.update + id,
        {
          first_name,
          last_name,
          username,
          email,
          password,
          type,
          phone_number,
          address,
          state,
          country,
          zip_code,
          status,

          //new
          city,
          currency,
          language,

          // social media
          facebook_url,
          linkedin_url,
          youtube_url,
          instagram_url,
          twitter_url,
          tiktok_url,

          //company details
          company_details,
        },
        config
      );
      dispatch({
        type: ADMIN_UPDATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_UPDATE_USER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminDeleteUserAction =
  ({ id }: adminUsersId) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_DELETE_USER_REQUEST,
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
        API_ROUTES?.adminUsers?.delete + id,
        config
      );
      dispatch({
        type: ADMIN_DELETE_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_DELETE_USER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetUserByIdAction =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GETBYID_USER_REQUEST,
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
        API_ROUTES?.adminUsers?.getByID + id,
        config
      );

      dispatch({
        type: ADMIN_GETBYID_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GETBYID_USER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetUsersAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_ALL_USERS_REQUEST,
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
        API_ROUTES?.adminUsers?.getAll + "?" + query.toString(),
        config
      );

      dispatch({
        type: ADMIN_GET_ALL_USERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_ALL_USERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetUserOrdersAction =
  (userId: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_USER_ORDERS_REQUEST,
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
        API_ROUTES?.adminUsers?.getUserOrders + userId,
        config
      );

      dispatch({
        type: ADMIN_GET_USER_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_USER_ORDERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
