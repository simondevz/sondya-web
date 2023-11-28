import { Dispatch } from "redux";
import axios from "axios";
import {
  USER_GET_GROUPCHATS_REQUEST,
  USER_GET_GROUPCHATS_FAIL,
  USER_GET_GROUPCHATS_SUCCESS,
  USER_GET_MESSAGES_FAIL,
  USER_GET_MESSAGES_REQUEST,
  USER_GET_MESSAGES_SUCCESS,
  USER_SEND_MESSAGE_FAIL,
  USER_SEND_MESSAGE_REQUEST,
  USER_SEND_MESSAGE_SUCCESS,
  USER_LIKE_MESSAGE_FAIL,
  USER_LIKE_MESSAGE_REQUEST,
  USER_LIKE_MESSAGE_SUCCESS,
  USER_JOIN_GROUPCHAT_FAIL,
  USER_JOIN_GROUPCHAT_REQUEST,
  USER_JOIN_GROUPCHAT_SUCCESS,
  USER_GET_GROUPCHAT_DETAILS_REQUEST,
  USER_GET_GROUPCHAT_DETAILS_FAIL,
  USER_GET_GROUPCHAT_DETAILS_SUCCESS,
  USER_GET_GROUPCHAT_MEMBERS_FAIL,
  USER_GET_GROUPCHAT_MEMBERS_REQUEST,
  USER_GET_GROUPCHAT_MEMBERS_SUCCESS,
  GET_USER_GROUPCHATS_FAIL,
  GET_USER_GROUPCHATS_REQUEST,
  GET_USER_GROUPCHATS_SUCCESS,
} from "../../constants/userDashboard/groupchat.constats";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";

export const userGetGroupchatsAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: USER_GET_GROUPCHATS_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      API_ROUTES?.userGroupChats?.getChats,
      config
    );

    dispatch({
      type: USER_GET_GROUPCHATS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: USER_GET_GROUPCHATS_FAIL,
      payload:
        error?.response && error.response?.data?.message
          ? error?.response?.data?.message
          : error?.message,
    });
  }
};

export const getUserGroupChatsAction =
  () => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    const user_id = login?.serverResponse?.data?.id;
    dispatch({ type: GET_USER_GROUPCHATS_REQUEST });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userGroupChats?.getUserGroupChats + user_id,
        config
      );

      dispatch({
        type: GET_USER_GROUPCHATS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_USER_GROUPCHATS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetMessagesAction =
  (group_id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_GET_MESSAGES_REQUEST });

    if (!group_id) {
      dispatch({
        type: USER_GET_MESSAGES_FAIL,
        payload: { message: "path not found" },
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userGroupChats?.getMessages + group_id,
        config
      );
      console.log("data -> ", data);
      console.log("group_id -> ", group_id);

      dispatch({
        type: USER_GET_MESSAGES_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_GET_MESSAGES_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetGroupChatDetailsAction =
  (group_id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_GET_GROUPCHAT_DETAILS_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userGroupChats?.getChat + group_id,
        config
      );

      dispatch({
        type: USER_GET_GROUPCHAT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_GET_GROUPCHAT_DETAILS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userGetGroupChatMembersAction =
  (group_id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_GET_GROUPCHAT_MEMBERS_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userGroupChats?.getMembers + group_id,
        config
      );

      dispatch({
        type: USER_GET_GROUPCHAT_MEMBERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_GET_GROUPCHAT_MEMBERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userSendMessageAction =
  ({ group_id, message }: { group_id: string; message: string }) =>
  async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    const sender_id = login?.serverResponse?.data?.id;
    dispatch({ type: USER_SEND_MESSAGE_REQUEST });

    if (!sender_id) {
      dispatch({
        type: USER_SEND_MESSAGE_FAIL,
        payload: { message: "Please login to send messages." },
      });
      return;
    }

    if (!message) {
      dispatch({
        type: USER_SEND_MESSAGE_FAIL,
        payload: { message: "No message entered." },
      });
      return;
    }

    if (!group_id) {
      dispatch({
        type: USER_SEND_MESSAGE_FAIL,
        payload: { message: "No group specified." },
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

      const { data } = await axios.post(
        API_ROUTES?.userGroupChats?.sendMessage,
        {
          sender_id,
          message,
          group_id,
        },
        config
      );

      dispatch({
        type: USER_SEND_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_SEND_MESSAGE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userLikeMessageAction =
  (message_id: string) => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    const user_id = login?.serverResponse?.data?.id;
    dispatch({ type: USER_LIKE_MESSAGE_REQUEST });

    if (!user_id) {
      dispatch({
        type: USER_LIKE_MESSAGE_FAIL,
        payload: { message: "Login to like messages" },
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

      const { data } = await axios.post(
        API_ROUTES?.userGroupChats?.likeMessage,
        { message_id, user_id },
        config
      );

      dispatch({
        type: USER_LIKE_MESSAGE_SUCCESS,
        payload: data,
      });
      console.log(data);
    } catch (error: any) {
      dispatch({
        type: USER_LIKE_MESSAGE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const userJoinGroupchatAction =
  (group_id: string) => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    const user_id = login?.serverResponse?.data?.id;
    dispatch({ type: USER_JOIN_GROUPCHAT_REQUEST });

    if (!user_id) {
      dispatch({
        type: USER_JOIN_GROUPCHAT_FAIL,
        payload: { message: "Login to join group chats" },
      });
      return;
    }

    if (!group_id) {
      dispatch({
        type: USER_JOIN_GROUPCHAT_FAIL,
        payload: { message: "No group specified" },
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

      const { data } = await axios.post(
        API_ROUTES?.userGroupChats?.joinChat,
        { user_id, group_id },
        config
      );

      dispatch({
        type: USER_JOIN_GROUPCHAT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_JOIN_GROUPCHAT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
