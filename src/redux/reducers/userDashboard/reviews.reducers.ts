import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  USER_CREATE_REVIEW_REQUEST,
  USER_CREATE_REVIEW_SUCCESS,
  USER_CREATE_REVIEW_FAIL,
  USER_CREATE_REVIEW_RESET,
  USER_REVIEW_STAT_FAIL,
  USER_REVIEW_STAT_REQUEST,
  USER_REVIEW_STAT_RESET,
  USER_REVIEW_STAT_SUCCESS,
  USER_LIST_REVIEW_FAIL,
  USER_LIST_REVIEW_REQUEST,
  USER_LIST_REVIEW_RESET,
  USER_LIST_REVIEW_SUCCESS,
} from "../../constants/userDashboard/review.constants";
import { initialState } from "../../initial.state";
import { ReduxResponseType, ActionType } from "../../types/general.types";

export const userCreateReviewReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_CREATE_REVIEW_REQUEST:
      return { ...initialState, loading: true };
    case USER_CREATE_REVIEW_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_CREATE_REVIEW_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_CREATE_REVIEW_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const reviewStatReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_REVIEW_STAT_REQUEST:
      return { ...initialState, loading: true };
    case USER_REVIEW_STAT_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_REVIEW_STAT_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_REVIEW_STAT_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const listReviewReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case USER_LIST_REVIEW_REQUEST:
      return { ...initialState, loading: true };
    case USER_LIST_REVIEW_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case USER_LIST_REVIEW_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_LIST_REVIEW_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
