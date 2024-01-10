import axios from "axios";
import { Dispatch } from "redux";
import {
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATION_FAIL,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_UNSEEN_COUNT_REQUEST,
  GET_NOTIFICATION_UNSEEN_COUNT_FAIL,
  GET_NOTIFICATION_UNSEEN_COUNT_SUCCESS,
  MARK_NOTIFICATION_SEEN_REQUEST,
  MARK_NOTIFICATION_SEEN_FAIL,
  MARK_NOTIFICATION_SEEN_SUCCESS,
  CREATE_SELLER_NOTIFICATION_FAIL,
  CREATE_SELLER_NOTIFICATION_REQUEST,
  CREATE_SELLER_NOTIFICATION_SUCCESS,
  CREATE_USER_NOTIFICATION_FAIL,
  CREATE_USER_NOTIFICATION_REQUEST,
  CREATE_USER_NOTIFICATION_SUCCESS,
  GET_4_NOTIFICATIONS_FAIL,
  GET_4_NOTIFICATIONS_REQUEST,
  GET_4_NOTIFICATIONS_SUCCESS,
} from "../constants/notifications.constants";
import { API_ROUTES } from "../routes";
import { LoginResponseType } from "../types/auth.types";
import { ReduxResponseType } from "../types/general.types";
import { NotificationType } from "../types/notifications.types";

export const createUserNotificationAction =
  (notification: NotificationType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      dispatch({
        type: CREATE_USER_NOTIFICATION_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.notification.create,
        notification,
        config
      );

      dispatch({
        type: CREATE_USER_NOTIFICATION_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: CREATE_USER_NOTIFICATION_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const createSellerNotificationAction =
  (notification: NotificationType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      dispatch({
        type: CREATE_SELLER_NOTIFICATION_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.notification.create,
        notification,
        config
      );

      dispatch({
        type: CREATE_SELLER_NOTIFICATION_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: CREATE_SELLER_NOTIFICATION_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const getNotificationsAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      dispatch({
        type: GET_NOTIFICATIONS_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.notification.get +
          login.serverResponse.data.id +
          "?" +
          query,
        config
      );

      dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: GET_NOTIFICATIONS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const get4NotificationsAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      dispatch({
        type: GET_4_NOTIFICATIONS_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.notification.get +
          login.serverResponse.data.id +
          "?" +
          "limit=4",
        config
      );

      dispatch({
        type: GET_4_NOTIFICATIONS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: GET_4_NOTIFICATIONS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const markNotificationSeenAction =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      dispatch({
        type: MARK_NOTIFICATION_SEEN_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.notification.markSeen + id,
        {},
        config
      );

      dispatch({
        type: MARK_NOTIFICATION_SEEN_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: MARK_NOTIFICATION_SEEN_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const getNotificationsUnseenCountAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      dispatch({
        type: GET_NOTIFICATION_UNSEEN_COUNT_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.notification.getUnseenCount +
          login?.serverResponse?.data?.id,
        config
      );

      dispatch({
        type: GET_NOTIFICATION_UNSEEN_COUNT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: GET_NOTIFICATION_UNSEEN_COUNT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const deleteNotificationAction =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      dispatch({
        type: DELETE_NOTIFICATION_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.delete(
        API_ROUTES?.notification.delete + id,

        config
      );

      dispatch({
        type: DELETE_NOTIFICATION_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: DELETE_NOTIFICATION_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
