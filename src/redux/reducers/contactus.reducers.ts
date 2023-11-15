import { LOGIN_RESET } from "../constants/auth.constants";
import {
  CONTACT_US_FAIL,
  CONTACT_US_REQUEST,
  CONTACT_US_RESET,
  CONTACT_US_SUCCESS,
} from "../constants/contactus.constants";
import { initialState } from "../initial.state";
import { ActionType, ReduxResponseType } from "../types/general.types";

export const CreateContactUsReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case CONTACT_US_REQUEST:
      return { ...initialState, loading: true };
    case CONTACT_US_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case CONTACT_US_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CONTACT_US_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
