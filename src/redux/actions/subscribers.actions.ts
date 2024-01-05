import axios from "axios";
import { Dispatch } from "redux";
import { API_ROUTES } from "../routes";
import {
  USER_SUBSCRIBE_REQUEST,
  USER_SUBSCRIBE_SUCCESS,
  USER_SUBSCRIBE_FAIL,
  ADMIN_GET_SUBSCRIBERS_FAIL,
  ADMIN_GET_SUBSCRIBERS_REQUEST,
  ADMIN_GET_SUBSCRIBERS_SUCCESS,
} from "../constants/subscribers.constants";
import { LoginResponseType } from "../types/auth.types";
import { ReduxResponseType } from "../types/general.types";

export const subscribeAction =
  (email: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: USER_SUBSCRIBE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.home?.subscribers,
        { email },
        config
      );

      dispatch({
        type: USER_SUBSCRIBE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_SUBSCRIBE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const getSubscribersAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;

    dispatch({ type: ADMIN_GET_SUBSCRIBERS_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.home?.getSubscribers + "?" + query,
        config
      );

      dispatch({ type: ADMIN_GET_SUBSCRIBERS_SUCCESS, payload: data });
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: ADMIN_GET_SUBSCRIBERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
