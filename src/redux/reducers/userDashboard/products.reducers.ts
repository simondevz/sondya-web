import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  USER_GET_PRODUCTS_REQUEST,
  USER_GET_PRODUCTS_SUCCESS,
  USER_GET_PRODUCTS_FAIL,
  USER_GET_PRODUCTS_RESET,
  USER_GET_PRODUCTS_CATEGORY_FAIL,
  USER_GET_PRODUCTS_CATEGORY_REQUEST,
  USER_GET_PRODUCTS_CATEGORY_RESET,
  USER_GET_PRODUCTS_CATEGORY_SUCCESS,
  USER_GET_PRODUCT_BY_ID_FAIL,
  USER_GET_PRODUCT_BY_ID_REQUEST,
  USER_GET_PRODUCT_BY_ID_RESET,
  USER_GET_PRODUCT_BY_ID_SUCCESS,
} from "../../constants/userDashboard/products.constants";
import { initialState } from "../../initial.state";
import { ReduxResponseType, ActionType } from "../../types/general.types";

export const userGetProductsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_PRODUCTS_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_PRODUCTS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_PRODUCTS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_PRODUCTS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetProductByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_PRODUCT_BY_ID_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_PRODUCT_BY_ID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_PRODUCT_BY_ID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const userGetProductCategoriesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_GET_PRODUCTS_CATEGORY_REQUEST:
      return { ...initialState, loading: true };
    case USER_GET_PRODUCTS_CATEGORY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_GET_PRODUCTS_CATEGORY_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_GET_PRODUCTS_CATEGORY_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
