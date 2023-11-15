import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_RESET,
  GET_PROFILE_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_SOCIALS_FAIL,
  UPDATE_SOCIALS_REQUEST,
  UPDATE_SOCIALS_RESET,
  UPDATE_SOCIALS_SUCCESS,
} from "../../constants/user/profile.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const GetUserProfileReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { ...initialState, loading: true };
    case GET_PROFILE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_PROFILE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_PROFILE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const UpdateProfileReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { ...initialState, loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const UpdatePasswordReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return { ...initialState, loading: true };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_PASSWORD_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const UpdateSocialsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case UPDATE_SOCIALS_REQUEST:
      return { ...initialState, loading: true };
    case UPDATE_SOCIALS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case UPDATE_SOCIALS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_SOCIALS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
