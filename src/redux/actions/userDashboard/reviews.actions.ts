import { Dispatch } from "redux";
import { createReviewType } from "../../types/review.types";
import { ReduxResponseType } from "../../types/general.types";
import { LoginResponseType } from "../../types/auth.types";
import axios from "axios";
import {
  USER_CREATE_REVIEW_FAIL,
  USER_CREATE_REVIEW_REQUEST,
  USER_CREATE_REVIEW_SUCCESS,
  USER_LIST_REVIEW_FAIL,
  USER_LIST_REVIEW_REQUEST,
  USER_LIST_REVIEW_SUCCESS,
  USER_REVIEW_STAT_FAIL,
  USER_REVIEW_STAT_REQUEST,
  USER_REVIEW_STAT_SUCCESS,
} from "../../constants/userDashboard/review.constants";
import { API_ROUTES } from "../../routes";

export const createReviewAction =
  ({ product_id, service_id, rating, review }: createReviewType) =>
  async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    const user_id = login?.serverResponse.data.id;

    if (!user_id) {
      dispatch({
        type: USER_CREATE_REVIEW_FAIL,
        payload: "Please login to leave a review",
      });
      return;
    }

    if (!(product_id || service_id)) {
      dispatch({
        type: USER_CREATE_REVIEW_FAIL,
        payload: "You must be reviewing a product or service",
      });
      return;
    }

    if (!rating) {
      dispatch({
        type: USER_CREATE_REVIEW_FAIL,
        payload: "You did not rate the product or service",
      });
      return;
    }

    if (!review) {
      dispatch({
        type: USER_CREATE_REVIEW_FAIL,
        payload: "Please share your thoughts",
      });
      return;
    }

    dispatch({ type: USER_CREATE_REVIEW_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.userReviews?.createReview,
        { user_id, product_id, service_id, review, rating },
        config
      );

      dispatch({ type: USER_CREATE_REVIEW_SUCCESS, payload: data });
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: USER_CREATE_REVIEW_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const reviewStatAction =
  (
    category: "product" | "service",
    id: string // product or service id
  ) =>
  async (dispatch: Dispatch) => {
    if (!(id || category)) {
      dispatch({
        type: USER_REVIEW_STAT_FAIL,
        payload: "path not found",
      });
      return;
    }

    dispatch({ type: USER_REVIEW_STAT_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.userReviews?.getReviewStat + `${category}/${id}`,
        config
      );

      dispatch({ type: USER_REVIEW_STAT_SUCCESS, payload: data });
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: USER_REVIEW_STAT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const listReviewsAction =
  (
    category: "product" | "service",
    id: string,
    { limit, page, search }: { limit: number; page: number; search: string }
  ) =>
  async (dispatch: Dispatch) => {
    if (!(id || category)) {
      dispatch({
        type: USER_LIST_REVIEW_FAIL,
        payload: "path not found",
      });
      return;
    }

    dispatch({ type: USER_LIST_REVIEW_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const dynamicPath: string = `${category}/${id}`;
      const queryString: string = `?limit=${limit}&page=${page}${
        search ? `&search=${search}` : ""
      }`;
      const { data } = await axios.get(
        API_ROUTES?.userReviews?.listReviews + dynamicPath + queryString,
        config
      );

      dispatch({ type: USER_LIST_REVIEW_SUCCESS, payload: data });
      console.log(data);
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: USER_LIST_REVIEW_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
