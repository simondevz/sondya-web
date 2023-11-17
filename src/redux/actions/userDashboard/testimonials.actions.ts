import axios from "axios";
import { Dispatch } from "redux";
import {
  CREATE_TESTIMONIAL_FAIL,
  CREATE_TESTIMONIAL_REQUEST,
  CREATE_TESTIMONIAL_SUCCESS,
  GET_APPROVED_TESTIMONIAL_FAIL,
  GET_APPROVED_TESTIMONIAL_REQUEST,
  GET_APPROVED_TESTIMONIAL_SUCCESS,
} from "../../constants/userDashboard/testimonials.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import { UserTestimonialType } from "../../types/users.types";

export const createTestimonialAction =
  ({ name, title, content }: UserTestimonialType) =>
  async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    const user_id = login?.serverResponse.data.id;

    if (!user_id) {
      dispatch({
        type: CREATE_TESTIMONIAL_FAIL,
        payload: "You need to login to submit a testimonial",
      });
      return;
    }

    if (!name) {
      dispatch({
        type: CREATE_TESTIMONIAL_FAIL,
        payload: "You need to fill in the name field",
      });
      return;
    }

    if (!title) {
      dispatch({
        type: CREATE_TESTIMONIAL_FAIL,
        payload: "You need to fill in the title field",
      });
      return;
    }

    if (!content) {
      dispatch({
        type: CREATE_TESTIMONIAL_FAIL,
        payload: "You need to fill in the content field",
      });
      return;
    }

    dispatch({ type: CREATE_TESTIMONIAL_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.users?.createTestimonial,
        { name, title, content, user_id },
        config
      );

      dispatch({ type: CREATE_TESTIMONIAL_SUCCESS, payload: data });
      console.log(data);
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: CREATE_TESTIMONIAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const getStateTestimonialAction =
  () => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    const user_id = login?.serverResponse.data.id;

    if (!user_id) {
      dispatch({
        type: GET_APPROVED_TESTIMONIAL_FAIL,
        payload: "You need to login to submit a testimonial",
      });
      return;
    }

    dispatch({ type: GET_APPROVED_TESTIMONIAL_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.users?.getALlAPProvedTestimonial,
        config
      );

      dispatch({ type: GET_APPROVED_TESTIMONIAL_SUCCESS, payload: data });
      console.log(data);
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: GET_APPROVED_TESTIMONIAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
