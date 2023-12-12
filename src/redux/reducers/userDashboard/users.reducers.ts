import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  USER_GET_USERS_REQUEST,
  USER_GET_USERS_SUCCESS,
  USER_GET_USERS_FAIL,
  USER_GET_USERS_RESET,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_RESET,
  GET_USER_SUCCESS,
} from "../../constants/userDashboard/user.constants";
import { initialState } from "../../initial.state";
import { ReduxResponseType, ActionType } from "../../types/general.types";

export const userGetUsersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_USERS_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_USERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_USERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_USERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const getUserReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...initialState, loading: true };
    case GET_USER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_USER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_USER_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
