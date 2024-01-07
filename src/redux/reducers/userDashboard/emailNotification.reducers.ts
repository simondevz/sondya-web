import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  ORDER_EMAIL_NOTIFICATION_REQUEST,
  ORDER_EMAIL_NOTIFICATION_SUCCESS,
  ORDER_EMAIL_NOTIFICATION_FAIL,
  ORDER_EMAIL_NOTIFICATION_RESET,
} from "../../constants/userDashboard/emailNotification.constatnts";
import { initialState } from "../../initial.state";
import { ReduxResponseType, ActionType } from "../../types/general.types";

export const orderEmailNotificationReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ORDER_EMAIL_NOTIFICATION_REQUEST:
      return { ...initialState, loading: true };
    case ORDER_EMAIL_NOTIFICATION_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ORDER_EMAIL_NOTIFICATION_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ORDER_EMAIL_NOTIFICATION_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
