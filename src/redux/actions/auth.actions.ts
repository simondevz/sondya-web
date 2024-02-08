import axios from "axios";
import { Dispatch } from "redux";
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_RESET,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
} from "../constants/auth.constants";
import { API_ROUTES } from "../routes";
import {
  ForgotPasswordType,
  LoginType,
  RegisterType,
  ResetPasswordType,
  VerifyEmailType,
} from "../types/auth.types";

export const registerAction =
  ({
    first_name,
    last_name,
    email,
    password,
    username,
    referrer,
    country,
  }: RegisterType) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // console.log(API_ROUTES?.auth?.register);
      const { data } = await axios.post(
        API_ROUTES?.auth?.register,
        { first_name, last_name, email, username, password, referrer, country },
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const verifyEmailAction =
  ({ email, code }: VerifyEmailType) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: VERIFY_EMAIL_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.auth?.verifyEmail + email,
        { code },
        config
      );
      dispatch({
        type: VERIFY_EMAIL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: VERIFY_EMAIL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const loginAction =
  ({ email, password }: LoginType) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.auth?.login,
        { password, email },
        config
      );
      // console.log(data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const logoutAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_RESET });
};

export const forgotPasswordAction =
  ({ email }: ForgotPasswordType) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.auth?.forgotPassword,
        { email },
        config
      );

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const resetPasswordAction =
  ({ email, password, confirm_password }: ResetPasswordType) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.auth?.resetPassword + email,
        { password, confirm_password },
        config
      );

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
