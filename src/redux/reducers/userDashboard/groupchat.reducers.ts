import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  GET_USER_GROUPCHATS_FAIL,
  GET_USER_GROUPCHATS_REQUEST,
  GET_USER_GROUPCHATS_RESET,
  GET_USER_GROUPCHATS_SUCCESS,
  USER_GET_GROUPCHATS_FAIL,
  USER_GET_GROUPCHATS_REQUEST,
  USER_GET_GROUPCHATS_RESET,
  USER_GET_GROUPCHATS_SUCCESS,
  USER_GET_GROUPCHAT_DETAILS_FAIL,
  USER_GET_GROUPCHAT_DETAILS_REQUEST,
  USER_GET_GROUPCHAT_DETAILS_RESET,
  USER_GET_GROUPCHAT_DETAILS_SUCCESS,
  USER_GET_GROUPCHAT_MEMBERS_FAIL,
  USER_GET_GROUPCHAT_MEMBERS_REQUEST,
  USER_GET_GROUPCHAT_MEMBERS_RESET,
  USER_GET_GROUPCHAT_MEMBERS_SUCCESS,
  USER_GET_MESSAGES_FAIL,
  USER_GET_MESSAGES_REQUEST,
  USER_GET_MESSAGES_RESET,
  USER_GET_MESSAGES_SUCCESS,
  USER_JOIN_GROUPCHAT_FAIL,
  USER_JOIN_GROUPCHAT_REQUEST,
  USER_JOIN_GROUPCHAT_RESET,
  USER_JOIN_GROUPCHAT_SUCCESS,
  USER_LIKE_MESSAGE_FAIL,
  USER_LIKE_MESSAGE_REQUEST,
  USER_LIKE_MESSAGE_RESET,
  USER_LIKE_MESSAGE_SUCCESS,
  USER_SEND_MESSAGE_FAIL,
  USER_SEND_MESSAGE_REQUEST,
  USER_SEND_MESSAGE_RESET,
  USER_SEND_MESSAGE_SUCCESS,
} from "../../constants/userDashboard/groupchat.constats";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const getUserGroupChatsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_USER_GROUPCHATS_REQUEST:
      return { ...initialState, loading: true };
    case GET_USER_GROUPCHATS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_USER_GROUPCHATS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_USER_GROUPCHATS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetGroupchatsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_GROUPCHATS_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_GROUPCHATS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_GROUPCHATS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_GROUPCHATS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetMessagesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_MESSAGES_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_MESSAGES_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_MESSAGES_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_MESSAGES_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userSendMessageReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_SEND_MESSAGE_REQUEST:
      return { ...initialState, loading: true };
    case USER_SEND_MESSAGE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_SEND_MESSAGE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_SEND_MESSAGE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userLikeMessageReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_LIKE_MESSAGE_REQUEST:
      return { ...initialState, loading: true };
    case USER_LIKE_MESSAGE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_LIKE_MESSAGE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_LIKE_MESSAGE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userJoinGroupchatReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_JOIN_GROUPCHAT_REQUEST:
      return { ...initialState, loading: true };
    case USER_JOIN_GROUPCHAT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_JOIN_GROUPCHAT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_JOIN_GROUPCHAT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetGroupchatDetailsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_GROUPCHAT_DETAILS_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_GROUPCHAT_DETAILS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_GROUPCHAT_DETAILS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_GROUPCHAT_DETAILS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetGroupchatMembersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_GROUPCHAT_MEMBERS_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_GROUPCHAT_MEMBERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_GROUPCHAT_MEMBERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_GROUPCHAT_MEMBERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
