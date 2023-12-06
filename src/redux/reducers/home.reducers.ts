import { LOGIN_RESET } from "../constants/auth.constants";
import {
  HOME_CATEGORIES_FAIL,
  HOME_CATEGORIES_REQUEST,
  HOME_CATEGORIES_RESET,
  HOME_CATEGORIES_SUCCESS,
  HOME_PRODUCTS_FAIL,
  HOME_PRODUCTS_REQUEST,
  HOME_PRODUCTS_RESET,
  HOME_PRODUCTS_SUCCESS,
  HOME_SERVICES_FAIL,
  HOME_SERVICES_REQUEST,
  HOME_SERVICES_RESET,
  HOME_SERVICES_SUCCESS,
} from "../constants/home.constants";
import { initialState } from "../initial.state";
import { ActionType, ReduxResponseType } from "../types/general.types";

export const homeGetProductsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case HOME_PRODUCTS_REQUEST:
      return { ...initialState, loading: true };
    case HOME_PRODUCTS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case HOME_PRODUCTS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case HOME_PRODUCTS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const homeGetServicesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case HOME_SERVICES_REQUEST:
      return { ...initialState, loading: true };
    case HOME_SERVICES_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case HOME_SERVICES_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case HOME_SERVICES_RESET:
    case LOGIN_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const homeGetCategoriesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case HOME_CATEGORIES_REQUEST:
      return { ...initialState, loading: true };
    case HOME_CATEGORIES_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case HOME_CATEGORIES_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case HOME_CATEGORIES_RESET:
    case LOGIN_RESET:
      return { ...initialState };
    default:
      return state;
  }
};
