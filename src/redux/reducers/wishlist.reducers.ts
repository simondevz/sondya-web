import { LOGIN_RESET } from "../constants/auth.constants";
import {
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_RESET,
  ADD_TO_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAIL,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_RESET,
  REMOVE_FROM_WISHLIST_SUCCESS,
  VIEW_WISHLIST_FAIL,
  VIEW_WISHLIST_REQUEST,
  VIEW_WISHLIST_RESET,
  VIEW_WISHLIST_SUCCESS,
} from "../constants/wishlist.constant";
import { initialState } from "../initial.state";
import { ActionType, ReduxResponseType } from "../types/general.types";

export const addToWishlistReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADD_TO_WISHLIST_REQUEST:
      return { ...initialState, loading: true };
    case ADD_TO_WISHLIST_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADD_TO_WISHLIST_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADD_TO_WISHLIST_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const viewWishlistReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case VIEW_WISHLIST_REQUEST:
      return { ...initialState, loading: true };
    case VIEW_WISHLIST_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case VIEW_WISHLIST_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case VIEW_WISHLIST_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const removeFromWishlistReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case REMOVE_FROM_WISHLIST_REQUEST:
      return { ...initialState, loading: true };
    case REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case REMOVE_FROM_WISHLIST_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case REMOVE_FROM_WISHLIST_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
