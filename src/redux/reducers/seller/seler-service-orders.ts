import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  GET_SELLER_SERVICE_ORDERS_FAIL,
  GET_SELLER_SERVICE_ORDERS_REQUEST,
  GET_SELLER_SERVICE_ORDERS_RESET,
  GET_SELLER_SERVICE_ORDERS_SUCCESS,
} from "../../constants/seller/seller-service-orders.constants";
import { initialState } from "../../initial.state";
import { ReduxResponseType, ActionType } from "../../types/general.types";

export const getSellerServiceOrdersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_SELLER_SERVICE_ORDERS_REQUEST:
      return { ...initialState, loading: true };
    case GET_SELLER_SERVICE_ORDERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_SELLER_SERVICE_ORDERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_SELLER_SERVICE_ORDERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
