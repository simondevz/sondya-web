import {
  ADMIN_ANALYTICS_TOPSERVICES_REQUEST,
  ADMIN_ANALYTICS_TOPSERVICES_SUCCESS,
  ADMIN_ANALYTICS_TOPSERVICES_FAIL,
  ADMIN_ANALYTICS_TOPSERVICES_RESET,
  ADMIN_ANALYTICS_TOPPRODUCTS_REQUEST,
  ADMIN_ANALYTICS_TOPPRODUCTS_SUCCESS,
  ADMIN_ANALYTICS_TOPPRODUCTS_FAIL,
  ADMIN_ANALYTICS_TOPPRODUCTS_RESET,
  ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_FAIL,
  ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_REQUEST,
  ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_RESET,
  ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_SUCCESS,
  ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_FAIL,
  ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_REQUEST,
  ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_RESET,
  ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_SUCCESS,
  ADMIN_ANALYTICS_REVENUE_AND_ORDER_FAIL,
  ADMIN_ANALYTICS_REVENUE_AND_ORDER_REQUEST,
  ADMIN_ANALYTICS_REVENUE_AND_ORDER_RESET,
  ADMIN_ANALYTICS_REVENUE_AND_ORDER_SUCCESS,
  ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_FAIL,
  ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_REQUEST,
  ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_RESET,
  ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_SUCCESS,
} from "../../constants/admin/analytics.constatnts";
import { LOGIN_RESET } from "../../constants/auth.constants";
import { initialState } from "../../initial.state";
import { ReduxResponseType, ActionType } from "../../types/general.types";

export const adminAnalytictsTopServicesReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_ANALYTICS_TOPSERVICES_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_ANALYTICS_TOPSERVICES_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_ANALYTICS_TOPSERVICES_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_ANALYTICS_TOPSERVICES_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminAnalytictsTopProductsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_ANALYTICS_TOPPRODUCTS_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_ANALYTICS_TOPPRODUCTS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_ANALYTICS_TOPPRODUCTS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_ANALYTICS_TOPPRODUCTS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminAnalytictsLatestProductOrdersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminAnalytictsLatestServiceOrdersReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminAnalyticsRevenueAndOrderReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_ANALYTICS_REVENUE_AND_ORDER_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_ANALYTICS_REVENUE_AND_ORDER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_ANALYTICS_REVENUE_AND_ORDER_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_ANALYTICS_REVENUE_AND_ORDER_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminAnalyticsVisitorsAndConversionsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
