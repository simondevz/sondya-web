import { LOGIN_RESET } from "../constants/auth.constants";
import {
  UPDATE_SHIPPING_DESTINATION_FAIL,
  UPDATE_SHIPPING_DESTINATION_REQUEST,
  UPDATE_SHIPPING_DESTINATION_RESET,
  UPDATE_SHIPPING_DESTINATION_SUCCESS,
  VIEW_SHIPPING_DESTINATION_FAIL,
  VIEW_SHIPPING_DESTINATION_REQUEST,
  VIEW_SHIPPING_DESTINATION_RESET,
  VIEW_SHIPPING_DESTINATION_SUCCESS,
} from "../constants/shippingdestination.constants";
import { initialState } from "../initial.state";
import { ActionType, ReduxResponseType } from "../types/general.types";

export const updateShippingDestinationReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case UPDATE_SHIPPING_DESTINATION_REQUEST:
      return { ...initialState, loading: true };
    case UPDATE_SHIPPING_DESTINATION_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case UPDATE_SHIPPING_DESTINATION_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_SHIPPING_DESTINATION_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const viewShippingDestinationReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case VIEW_SHIPPING_DESTINATION_REQUEST:
      return { ...initialState, loading: true };
    case VIEW_SHIPPING_DESTINATION_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case VIEW_SHIPPING_DESTINATION_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case VIEW_SHIPPING_DESTINATION_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
