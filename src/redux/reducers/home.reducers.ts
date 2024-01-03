import { LOGIN_RESET } from "../constants/auth.constants";
import {
  HOME_PRODUCTS_CATEGORY_FAIL,
  HOME_PRODUCTS_CATEGORY_REQUEST,
  HOME_PRODUCTS_CATEGORY_RESET,
  HOME_PRODUCTS_CATEGORY_SUCCESS,
  HOME_PRODUCTS_DETAIL_FAIL,
  HOME_PRODUCTS_DETAIL_REQUEST,
  HOME_PRODUCTS_DETAIL_RESET,
  HOME_PRODUCTS_DETAIL_SUCCESS,
  HOME_PRODUCTS_FAIL,
  HOME_PRODUCTS_REQUEST,
  HOME_PRODUCTS_RESET,
  HOME_PRODUCTS_SUCCESS,
  HOME_SERVICES_CATEGORY_FAIL,
  HOME_SERVICES_CATEGORY_REQUEST,
  HOME_SERVICES_CATEGORY_RESET,
  HOME_SERVICES_CATEGORY_SUCCESS,
  HOME_SERVICES_DETAIL_FAIL,
  HOME_SERVICES_DETAIL_REQUEST,
  HOME_SERVICES_DETAIL_RESET,
  HOME_SERVICES_DETAIL_SUCCESS,
  HOME_SERVICES_FAIL,
  HOME_SERVICES_REQUEST,
  HOME_SERVICES_RESET,
  HOME_SERVICES_SUCCESS,
  YOU_MAY_LIKE_PRODUCTS_FAIL,
  YOU_MAY_LIKE_PRODUCTS_REQUEST,
  YOU_MAY_LIKE_PRODUCTS_RESET,
  YOU_MAY_LIKE_PRODUCTS_SUCCESS,
  YOU_MAY_LIKE_SERVICES_FAIL,
  YOU_MAY_LIKE_SERVICES_REQUEST,
  YOU_MAY_LIKE_SERVICES_RESET,
  YOU_MAY_LIKE_SERVICES_SUCCESS,
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

export const homeGetProductDetailReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case HOME_PRODUCTS_DETAIL_REQUEST:
      return { ...initialState, loading: true };
    case HOME_PRODUCTS_DETAIL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case HOME_PRODUCTS_DETAIL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case HOME_PRODUCTS_DETAIL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const homeGetServiceDetailReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case HOME_SERVICES_DETAIL_REQUEST:
      return { ...initialState, loading: true };
    case HOME_SERVICES_DETAIL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case HOME_SERVICES_DETAIL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case HOME_SERVICES_DETAIL_RESET:
    case LOGIN_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const homeGetServiceCategoryReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case HOME_SERVICES_CATEGORY_REQUEST:
      return { ...initialState, loading: true };
    case HOME_SERVICES_CATEGORY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case HOME_SERVICES_CATEGORY_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case HOME_SERVICES_CATEGORY_RESET:
    case LOGIN_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const homeGetProductCategoryReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case HOME_PRODUCTS_CATEGORY_REQUEST:
      return { ...initialState, loading: true };
    case HOME_PRODUCTS_CATEGORY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case HOME_PRODUCTS_CATEGORY_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case HOME_PRODUCTS_CATEGORY_RESET:
    case LOGIN_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const youMayLikeProductsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case YOU_MAY_LIKE_PRODUCTS_REQUEST:
      return { ...initialState, loading: true };
    case YOU_MAY_LIKE_PRODUCTS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case YOU_MAY_LIKE_PRODUCTS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case YOU_MAY_LIKE_PRODUCTS_RESET:
    case LOGIN_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const youMayLikeServicesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case YOU_MAY_LIKE_SERVICES_REQUEST:
      return { ...initialState, loading: true };
    case YOU_MAY_LIKE_SERVICES_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case YOU_MAY_LIKE_SERVICES_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case YOU_MAY_LIKE_SERVICES_RESET:
    case LOGIN_RESET:
      return { ...initialState };
    default:
      return state;
  }
};
