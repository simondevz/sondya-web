import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  CREATE_SERVICE_ORDER_FAIL,
  CREATE_SERVICE_ORDER_REQUEST,
  CREATE_SERVICE_ORDER_RESET,
  CREATE_SERVICE_ORDER_SUCCESS,
  GET_SERVICE_ORDER_BYID_FAIL,
  GET_SERVICE_ORDER_BYID_REQUEST,
  GET_SERVICE_ORDER_BYID_RESET,
  GET_SERVICE_ORDER_BYID_SUCCESS,
  UPDATE_TERMS_FAIL,
  UPDATE_TERMS_REQUEST,
  UPDATE_TERMS_RESET,
  UPDATE_TERMS_SUCCESS,
} from "../../constants/userDashboard/serviceOrder.constants";
import { initialState } from "../../initial.state";
import { ReduxResponseType, ActionType } from "../../types/general.types";

export const getServiceOrderByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_SERVICE_ORDER_BYID_REQUEST:
      return { ...initialState, loading: true };
    case GET_SERVICE_ORDER_BYID_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_SERVICE_ORDER_BYID_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_SERVICE_ORDER_BYID_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const createServiceOrderReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case CREATE_SERVICE_ORDER_REQUEST:
      return { ...initialState, loading: true };
    case CREATE_SERVICE_ORDER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case CREATE_SERVICE_ORDER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_SERVICE_ORDER_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const updateTermsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case UPDATE_TERMS_REQUEST:
      return { ...initialState, loading: true };
    case UPDATE_TERMS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case UPDATE_TERMS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_TERMS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
