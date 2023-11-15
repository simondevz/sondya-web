import {
  CREATE_TESTIMONIAL_FAIL,
  CREATE_TESTIMONIAL_REQUEST,
  CREATE_TESTIMONIAL_RESET,
  CREATE_TESTIMONIAL_SUCCESS,
} from "../../constants/userDashboard/testimonials.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const testimonialReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case CREATE_TESTIMONIAL_REQUEST:
      return {
        ...initialState,
        testimonial: {
          ...state.testimonial,
          loading: true,
          serverResponse: action.payload,
        },
      };

    case CREATE_TESTIMONIAL_SUCCESS:
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

    case CREATE_TESTIMONIAL_FAIL:
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

    case CREATE_TESTIMONIAL_RESET:
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
