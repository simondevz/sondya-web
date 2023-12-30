import axios from "axios";
import { Dispatch } from "redux";
import {
  GET_SELLER_SERVICE_ORDERS_REQUEST,
  GET_SELLER_SERVICE_ORDERS_SUCCESS,
  GET_SELLER_SERVICE_ORDERS_FAIL,
} from "../../constants/seller/seller-service-orders.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";

export const getSellerServiceOrdersAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;
      const seller_id = login.serverResponse.data.id;
      dispatch({
        type: GET_SELLER_SERVICE_ORDERS_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.sellerServiceOrders?.getSellerServiceOrders + seller_id,
        config
      );

      dispatch({
        type: GET_SELLER_SERVICE_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_SELLER_SERVICE_ORDERS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
