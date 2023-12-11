import { Dispatch } from "redux";
import axios from "axios";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import {
  USER_GET_CHATS_FAIL,
  USER_GET_CHATS_MESSAGES_FAIL,
  USER_GET_CHATS_MESSAGES_REQUEST,
  USER_GET_CHATS_MESSAGES_SUCCESS,
  USER_GET_CHATS_REQUEST,
  USER_GET_CHATS_SUCCESS,
} from "../../constants/userDashboard/chats.constants";

export const userGetChatsAction =
  () => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    const user_id = login?.serverResponse?.data?.id;
    dispatch({ type: USER_GET_CHATS_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userChats?.getChats + user_id,
        config
      );

      dispatch({
        type: USER_GET_CHATS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_GET_CHATS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGeChatMessagesAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    dispatch({ type: USER_GET_CHATS_MESSAGES_REQUEST });

    if (!query) {
      dispatch({
        type: USER_GET_CHATS_MESSAGES_FAIL,
        payload: {
          message: "sender_id snd receiver_id query parameters are compulsory",
        },
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userChats?.getMessages + "?" + query,
        config
      );

      dispatch({
        type: USER_GET_CHATS_MESSAGES_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_GET_CHATS_MESSAGES_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
