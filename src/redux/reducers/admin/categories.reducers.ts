import {
  ADMIN_CREATE_CATEGORY_FAIL,
  ADMIN_CREATE_CATEGORY_REQUEST,
  ADMIN_CREATE_CATEGORY_RESET,
  ADMIN_CREATE_CATEGORY_SUCCESS,
  ADMIN_DELETE_CATEGORY_FAIL,
  ADMIN_DELETE_CATEGORY_REQUEST,
  ADMIN_DELETE_CATEGORY_RESET,
  ADMIN_DELETE_CATEGORY_SUCCESS,
  ADMIN_GETBYID_CATEGORY_FAIL,
  ADMIN_GETBYID_CATEGORY_REQUEST,
  ADMIN_GETBYID_CATEGORY_RESET,
  ADMIN_GETBYID_CATEGORY_SUCCESS,
  ADMIN_GET_ALL_CATEGORY_FAIL,
  ADMIN_GET_ALL_CATEGORY_REQUEST,
  ADMIN_GET_ALL_CATEGORY_RESET,
  ADMIN_GET_ALL_CATEGORY_SUCCESS,
  ADMIN_UPDATE_CATEGORY_FAIL,
  ADMIN_UPDATE_CATEGORY_REQUEST,
  ADMIN_UPDATE_CATEGORY_RESET,
  ADMIN_UPDATE_CATEGORY_SUCCESS,
} from "../../constants/admin/categories.constants";
import { LOGIN_RESET } from "../../constants/auth.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const adminCreateCategoryReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_CREATE_CATEGORY_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_CREATE_CATEGORY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_CREATE_CATEGORY_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_CREATE_CATEGORY_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminUpdateCategoryReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_UPDATE_CATEGORY_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_UPDATE_CATEGORY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_UPDATE_CATEGORY_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_UPDATE_CATEGORY_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminDeleteCategoryReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_DELETE_CATEGORY_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_DELETE_CATEGORY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_DELETE_CATEGORY_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_DELETE_CATEGORY_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetCategoryByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GETBYID_CATEGORY_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GETBYID_CATEGORY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GETBYID_CATEGORY_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GETBYID_CATEGORY_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminGetCategoriesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_ALL_CATEGORY_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_ALL_CATEGORY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_ALL_CATEGORY_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_ALL_CATEGORY_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
