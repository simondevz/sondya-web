import {
  TESTIMONIAL_ERROR,
  TESTIMONIAL_LOADING,
  TESTIMONIAL_SHOW_FORM,
  TESTIMONIAL_SUCCESS,
} from "../constants/auth.constants";
import { initialState } from "../initial.state";
import { ActionType, ReduxResponseType } from "../types/general.types";

export const testimonialReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case TESTIMONIAL_LOADING:
      return {
        ...initialState,
        testimonial: {
          ...state.testimonial,
          loading: true,
          serverResponse: action.payload,
        },
      };

    case TESTIMONIAL_SUCCESS:
      return {
        ...initialState,
        testimonial: {
          ...state.testimonial,
          loading: false,
          success: true,
          error: "",
          serverResponse: action.payload,
        },
      };

    case TESTIMONIAL_ERROR:
      return {
        ...initialState,
        testimonial: {
          ...state.testimonial,
          loading: false,
          success: false,
          error: action.payload?.message || "Something Went Wrong. Try Again",
          serverResponse: {},
        },
      };

    case TESTIMONIAL_SHOW_FORM:
      return {
        ...initialState,
        testimonial: {
          ...state.testimonial,
          loading: false,
          success: false,
          error: "",
        },
      };

    default:
      return state;
  }
};
