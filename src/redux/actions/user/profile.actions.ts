import axios from "axios";
import { Dispatch } from "redux";
import {
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "../../constants/user/profile.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import {
  passwordUpdateType,
  profileUpdateType,
  socialsUpdateType,
} from "../../types/users.types";

export const GetUserProfileAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_PROFILE_REQUEST,
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
        API_ROUTES?.profile?.getProfile + id,
        config
      );
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_PROFILE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UpdateProfileAction =
  ({
    first_name,
    last_name,
    username,
    email,
    password,
    phone_number,
    state,
    country,
    zip_code,

    id,
  }: profileUpdateType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_REQUEST,
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
        API_ROUTES?.profile?.updateProfile + id,
        {
          first_name,
          last_name,
          username,
          email,
          password,
          phone_number,
          state,
          country,
          zip_code,
        },
        config
      );
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UpdatePasswordAction =
  ({
    current_password,
    new_password,
    confirm_password,

    id,
  }: passwordUpdateType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_REQUEST,
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
        API_ROUTES?.profile?.changePassword + id,
        {
          current_password,
          new_password,
          confirm_password,
        },
        config
      );
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UpdateSocialsAction =
  ({
    facebook_url,
    linkedin_url,
    youtube_url,
    instagram_url,
    twitter_url,
    tiktok_url,

    id,
  }: socialsUpdateType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_REQUEST,
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
        API_ROUTES?.profile?.updateSocials + id,
        {
          facebook_url,
          linkedin_url,
          youtube_url,
          instagram_url,
          twitter_url,
          tiktok_url,
        },
        config
      );
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
