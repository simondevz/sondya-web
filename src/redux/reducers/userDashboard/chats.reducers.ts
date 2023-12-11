import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  USER_GET_CHATS_MESSAGES_REQUEST,
  USER_GET_CHATS_MESSAGES_SUCCESS,
  USER_GET_CHATS_MESSAGES_FAIL,
  USER_GET_CHATS_MESSAGES_RESET,
  USER_GET_CHATS_REQUEST,
  USER_GET_CHATS_SUCCESS,
  USER_GET_CHATS_FAIL,
  USER_GET_CHATS_RESET,
} from "../../constants/userDashboard/chats.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const getUserChatsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_CHATS_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_CHATS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_CHATS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_CHATS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetChatMessagesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_CHATS_MESSAGES_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_CHATS_MESSAGES_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_CHATS_MESSAGES_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_CHATS_MESSAGES_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
