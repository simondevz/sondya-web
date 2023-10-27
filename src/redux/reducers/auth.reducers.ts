import { jwtDecode as jwtDecode2 } from "jwt-decode";
import { LOGIN_SESSION } from "../../extraStorage/storageStore";
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_RESET,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_RESET,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_RESET,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_SUCCESS,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_RESET,
  VERIFY_EMAIL_SUCCESS,
} from "../constants/auth.constants";
import { initialState } from "../initial.state";
import { LoginResponseType } from "../types/auth.types";
import { ActionType, ReduxResponseType } from "../types/general.types";

export const registerReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...initialState, loading: true };
    case REGISTER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case REGISTER_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const loginReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...initialState, loading: true };
    case LOGIN_SUCCESS:
      // Set response to local storagae
      const login = {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };

      if (login.serverResponse?.data?.token !== "") {
        // Decode the token
        const decodedToken = jwtDecode2<LoginResponseType>(
          login.serverResponse?.data?.token
        );
        decodedToken.token = login.serverResponse?.data?.token;
        if (typeof window !== "undefined") {
          localStorage.setItem(LOGIN_SESSION, JSON.stringify(decodedToken));
        }
      }

      return login;
    case LOGIN_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { ...initialState, loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case FORGOT_PASSWORD_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const verifyEmailReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case VERIFY_EMAIL_REQUEST:
      return { ...initialState, loading: true };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case VERIFY_EMAIL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case VERIFY_EMAIL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const resetPasswordReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { ...initialState, loading: true };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case RESET_PASSWORD_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

// export { initialState };
// function jwtDecode<T>(token: any) {
//   throw new Error("Function not implemented.");
// }
