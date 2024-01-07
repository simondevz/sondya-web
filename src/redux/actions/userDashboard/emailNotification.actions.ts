import axios from "axios";
import { Dispatch } from "redux";
import {
  ORDER_EMAIL_NOTIFICATION_REQUEST,
  ORDER_EMAIL_NOTIFICATION_SUCCESS,
  ORDER_EMAIL_NOTIFICATION_FAIL,
} from "../../constants/userDashboard/emailNotification.constatnts";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { OrderEmailNotificationType } from "../../types/emailNotification.types";
import { ReduxResponseType } from "../../types/general.types";

export const orderEmailNotificationAction =
  (orderDetails: OrderEmailNotificationType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      dispatch({
        type: ORDER_EMAIL_NOTIFICATION_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.emailNotification.orders,
        orderDetails,
        config
      );
      dispatch({
        type: ORDER_EMAIL_NOTIFICATION_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: ORDER_EMAIL_NOTIFICATION_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
