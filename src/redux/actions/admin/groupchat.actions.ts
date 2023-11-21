import { Dispatch } from "redux";
import { ReduxResponseType } from "../../types/general.types";
import { adminGroupChatType } from "../../types/groupchat.types";
import {
  ADMIN_ACTIVATE_GROUPCHAT_FAIL,
  ADMIN_ACTIVATE_GROUPCHAT_REQUEST,
  ADMIN_ACTIVATE_GROUPCHAT_SUCCESS,
  ADMIN_CREATE_GROUPCHAT_FAIL,
  ADMIN_CREATE_GROUPCHAT_REQUEST,
  ADMIN_CREATE_GROUPCHAT_SUCCESS,
  ADMIN_DELETE_GROUPCHAT_FAIL,
  ADMIN_DELETE_GROUPCHAT_REQUEST,
  ADMIN_DELETE_GROUPCHAT_SUCCESS,
  ADMIN_GET_GROUPCHATS_FAIL,
  ADMIN_GET_GROUPCHATS_REQUEST,
  ADMIN_GET_GROUPCHATS_SUCCESS,
  ADMIN_SUSPEND_GROUPCHAT_FAIL,
  ADMIN_SUSPEND_GROUPCHAT_REQUEST,
  ADMIN_SUSPEND_GROUPCHAT_SUCCESS,
} from "../../constants/admin/groupchat.constants";
import { LoginResponseType } from "../../types/auth.types";
import axios from "axios";
import { API_ROUTES } from "../../routes";

export const adminCreateGroupChatAction =
  ({ name, description, admin_id, files, status }: adminGroupChatType) =>
  async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    admin_id = login?.serverResponse?.data?.id;
    dispatch({ type: ADMIN_CREATE_GROUPCHAT_REQUEST });

    if (!admin_id) {
      dispatch({
        type: ADMIN_CREATE_GROUPCHAT_FAIL,
        payload: { message: "Something went wrong. Try reloading the page..." },
      });
      return;
    }

    if (!name) {
      dispatch({
        type: ADMIN_CREATE_GROUPCHAT_FAIL,
        payload: { message: "Please provide a name for the group chat" },
      });
      return;
    }

    if (!description) {
      dispatch({
        type: ADMIN_CREATE_GROUPCHAT_FAIL,
        payload: { message: "Please provide a name for the gropu chat" },
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

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("admin_id", admin_id);
      formData.append("status", status);

      //  Because formData will not accept data type of blob|undefined
      if (files) {
        const groupPicture: Array<Blob> = files;
        for (let index = 0; index < groupPicture.length; index++) {
          formData.append("image", groupPicture[index]);
        }
      }

      const { data } = await axios.post(
        API_ROUTES?.adminGroupchats?.create,
        formData,
        config
      );

      dispatch({
        type: ADMIN_CREATE_GROUPCHAT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_CREATE_GROUPCHAT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetGroupChatAction =
  () => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    const admin_id = login?.serverResponse?.data?.id;
    dispatch({ type: ADMIN_GET_GROUPCHATS_REQUEST });
    console.log(login);

    if (!admin_id) {
      dispatch({
        type: ADMIN_GET_GROUPCHATS_FAIL,
        payload: { message: "Something went wrong. Try reloading the page..." },
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
        API_ROUTES?.adminGroupchats?.getChats + admin_id,
        config
      );

      dispatch({
        type: ADMIN_GET_GROUPCHATS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_GROUPCHATS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminDeleteGroupchatAction =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    dispatch({ type: ADMIN_DELETE_GROUPCHAT_REQUEST });
    console.log(id);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.delete(
        `${API_ROUTES?.adminGroupchats?.delete}${id}`,
        config
      );

      dispatch({
        type: ADMIN_DELETE_GROUPCHAT_SUCCESS,
        payload: data,
      });
      window.location.reload();
    } catch (error: any) {
      dispatch({
        type: ADMIN_DELETE_GROUPCHAT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminActivateGroupchatAction =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    dispatch({ type: ADMIN_ACTIVATE_GROUPCHAT_REQUEST });
    console.log(id);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_ROUTES?.adminGroupchats?.activate}${id}`,
        {},
        config
      );

      dispatch({
        type: ADMIN_ACTIVATE_GROUPCHAT_SUCCESS,
        payload: data,
      });
      window.location.reload();
    } catch (error: any) {
      dispatch({
        type: ADMIN_ACTIVATE_GROUPCHAT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminSuspendGroupchatAction =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    dispatch({ type: ADMIN_SUSPEND_GROUPCHAT_REQUEST });
    console.log(id);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_ROUTES?.adminGroupchats?.suspend}${id}`,
        {},
        config
      );

      dispatch({
        type: ADMIN_SUSPEND_GROUPCHAT_SUCCESS,
        payload: data,
      });
      window.location.reload();
    } catch (error: any) {
      dispatch({
        type: ADMIN_SUSPEND_GROUPCHAT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
