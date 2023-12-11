import { LOGIN_RESET } from "../constants/auth.constants";
import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_RESET,
  ADD_TO_CART_SUCCESS,
  CLEAR_CART_FAIL,
  CLEAR_CART_REQUEST,
  CLEAR_CART_RESET,
  CLEAR_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_RESET,
  REMOVE_FROM_CART_SUCCESS,
  TOTAL_CART_FAIL,
  TOTAL_CART_REQUEST,
  TOTAL_CART_RESET,
  TOTAL_CART_SUCCESS,
  UPDATE_CART_FAIL,
  UPDATE_CART_REQUEST,
  UPDATE_CART_RESET,
  UPDATE_CART_SUCCESS,
  VIEW_CART_FAIL,
  VIEW_CART_REQUEST,
  VIEW_CART_RESET,
  VIEW_CART_SUCCESS,
} from "../constants/cart.constants";
import { initialState } from "../initial.state";
import { ActionType, ReduxResponseType } from "../types/general.types";

export const addToCartReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { ...initialState, loading: true };
    case ADD_TO_CART_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADD_TO_CART_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADD_TO_CART_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const viewCartReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case VIEW_CART_REQUEST:
      return { ...initialState, loading: true };
    case VIEW_CART_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case VIEW_CART_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case VIEW_CART_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const updateCartReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case UPDATE_CART_REQUEST:
      return { ...initialState, loading: true };
    case UPDATE_CART_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case UPDATE_CART_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_CART_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const removeFromCartReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case REMOVE_FROM_CART_REQUEST:
      return { ...initialState, loading: true };
    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case REMOVE_FROM_CART_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case REMOVE_FROM_CART_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const clearCartReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case CLEAR_CART_REQUEST:
      return { ...initialState, loading: true };
    case CLEAR_CART_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case CLEAR_CART_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CLEAR_CART_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const totalCartReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case TOTAL_CART_REQUEST:
      return { ...initialState, loading: true };
    case TOTAL_CART_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case TOTAL_CART_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case TOTAL_CART_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
