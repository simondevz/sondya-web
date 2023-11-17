import { ActionType, ReduxResponseType } from "../../types/general.types";
import { initialState } from "../../initial.state";
import {
  ADMIN_APPROVE_TESTIMONIAL_FAIL,
  ADMIN_APPROVE_TESTIMONIAL_REQUEST,
  ADMIN_APPROVE_TESTIMONIAL_RESET,
  ADMIN_APPROVE_TESTIMONIAL_SUCCESS,
  ADMIN_DELETE_TESTIMONIAL_FAIL,
  ADMIN_DELETE_TESTIMONIAL_REQUEST,
  ADMIN_DELETE_TESTIMONIAL_RESET,
  ADMIN_DELETE_TESTIMONIAL_SUCCESS,
  ADMIN_GET_UNAPPROVED_TESTIMONIAL_FAIL,
  ADMIN_GET_UNAPPROVED_TESTIMONIAL_REQUEST,
  ADMIN_GET_UNAPPROVED_TESTIMONIAL_RESET,
  ADMIN_GET_UNAPPROVED_TESTIMONIAL_SUCCESS,
  ADMIN_UPDATE_TESTIMONIAL_FAIL,
  ADMIN_UPDATE_TESTIMONIAL_REQUEST,
  ADMIN_UPDATE_TESTIMONIAL_RESET,
  ADMIN_UPDATE_TESTIMONIAL_SUCCESS,
} from "../../constants/admin/testimonials.constants";
import { LOGIN_RESET } from "../../constants/auth.constants";

export const adminGetUnapprovedTestimonialsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_GET_UNAPPROVED_TESTIMONIAL_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_GET_UNAPPROVED_TESTIMONIAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_GET_UNAPPROVED_TESTIMONIAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_GET_UNAPPROVED_TESTIMONIAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminApproveTestimonialsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_APPROVE_TESTIMONIAL_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_APPROVE_TESTIMONIAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_APPROVE_TESTIMONIAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_APPROVE_TESTIMONIAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminDeleteTestimonialsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_DELETE_TESTIMONIAL_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_DELETE_TESTIMONIAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_DELETE_TESTIMONIAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_DELETE_TESTIMONIAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const adminUpdateTestimonialsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADMIN_UPDATE_TESTIMONIAL_REQUEST:
      return { ...initialState, loading: true };
    case ADMIN_UPDATE_TESTIMONIAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADMIN_UPDATE_TESTIMONIAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADMIN_UPDATE_TESTIMONIAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
