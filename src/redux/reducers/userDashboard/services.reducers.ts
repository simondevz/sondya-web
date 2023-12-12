import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  USER_GET_SERVICES_REQUEST,
  USER_GET_SERVICES_SUCCESS,
  USER_GET_SERVICES_FAIL,
  USER_GET_SERVICES_RESET,
  USER_GET_SERVICES_CATEGORY_FAIL,
  USER_GET_SERVICES_CATEGORY_REQUEST,
  USER_GET_SERVICES_CATEGORY_RESET,
  USER_GET_SERVICES_CATEGORY_SUCCESS,
  USER_GET_SERVICE_BY_ID_FAIL,
  USER_GET_SERVICE_BY_ID_REQUEST,
  USER_GET_SERVICE_BY_ID_RESET,
  USER_GET_SERVICE_BY_ID_SUCCESS,
} from "../../constants/userDashboard/services.constants";
import { initialState } from "../../initial.state";
import { ReduxResponseType, ActionType } from "../../types/general.types";

export const userGetServicesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_SERVICES_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_SERVICES_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_SERVICES_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_SERVICES_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetServiceByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_SERVICE_BY_ID_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_SERVICE_BY_ID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_SERVICE_BY_ID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_SERVICE_BY_ID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetServiceCategoriesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_SERVICES_CATEGORY_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_SERVICES_CATEGORY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_SERVICES_CATEGORY_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_SERVICES_CATEGORY_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
