import axios from "axios";
import { Dispatch } from "redux";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import {
  SELLER_RESPOND_REVIEW_FAIL,
  SELLER_RESPOND_REVIEW_REQUEST,
  SELLER_RESPOND_REVIEW_SUCCESS,
} from "../../constants/seller/seller-reviewResponse.constants";
import { respondReviewType } from "../../types/review.types";

export const sellerRespondReviewAction =
  ({ review_id, response }: respondReviewType) =>
  async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    const user_id = login?.serverResponse.data.id;

    if (!user_id) {
      dispatch({
        type: SELLER_RESPOND_REVIEW_FAIL,
        payload: "Please login to respond",
      });
      return;
    }

    if (!response) {
      dispatch({
        type: SELLER_RESPOND_REVIEW_FAIL,
        payload: "You did not respond",
      });
      return;
    }

    if (!review_id) {
      dispatch({
        type: SELLER_RESPOND_REVIEW_FAIL,
        payload: "Review not found. Please reload the page",
      });
      return;
    }

    dispatch({ type: SELLER_RESPOND_REVIEW_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.sellerReviews?.respond,
        { user_id, response, review_id },
        config
      );

      dispatch({ type: SELLER_RESPOND_REVIEW_SUCCESS, payload: data });
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: SELLER_RESPOND_REVIEW_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
