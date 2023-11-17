import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  CREATE_TESTIMONIAL_FAIL,
  CREATE_TESTIMONIAL_REQUEST,
  CREATE_TESTIMONIAL_RESET,
  CREATE_TESTIMONIAL_SUCCESS,
  GET_APPROVED_TESTIMONIAL_FAIL,
  GET_APPROVED_TESTIMONIAL_REQUEST,
  GET_APPROVED_TESTIMONIAL_RESET,
  GET_APPROVED_TESTIMONIAL_SUCCESS,
} from "../../constants/userDashboard/testimonials.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const testimonialReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case CREATE_TESTIMONIAL_REQUEST:
      return { ...initialState, loading: true };
    case CREATE_TESTIMONIAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case CREATE_TESTIMONIAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_TESTIMONIAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const getApprovedTestimonialReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_APPROVED_TESTIMONIAL_REQUEST:
      return { ...initialState, loading: true };
    case GET_APPROVED_TESTIMONIAL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case GET_APPROVED_TESTIMONIAL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_APPROVED_TESTIMONIAL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
