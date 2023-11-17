import axios from "axios";
import { Dispatch } from "redux";

import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import {
  ADMIN_APPROVE_TESTIMONIAL_FAIL,
  ADMIN_APPROVE_TESTIMONIAL_REQUEST,
  ADMIN_APPROVE_TESTIMONIAL_SUCCESS,
  ADMIN_DELETE_TESTIMONIAL_FAIL,
  ADMIN_DELETE_TESTIMONIAL_REQUEST,
  ADMIN_DELETE_TESTIMONIAL_SUCCESS,
  ADMIN_GET_UNAPPROVED_TESTIMONIAL_FAIL,
  ADMIN_GET_UNAPPROVED_TESTIMONIAL_REQUEST,
  ADMIN_GET_UNAPPROVED_TESTIMONIAL_SUCCESS,
  ADMIN_UPDATE_TESTIMONIAL_FAIL,
  ADMIN_UPDATE_TESTIMONIAL_REQUEST,
  ADMIN_UPDATE_TESTIMONIAL_SUCCESS,
} from "../../constants/admin/testimonials.constants";
import { AdminTestimonialType } from "../../types/users.types";

export const adminGetUnapprovedTestimonialsAction =
  () => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    dispatch({ type: ADMIN_GET_UNAPPROVED_TESTIMONIAL_REQUEST });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.adminTestimonials?.getUnapproved,
        config
      );

      dispatch({
        type: ADMIN_GET_UNAPPROVED_TESTIMONIAL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_UNAPPROVED_TESTIMONIAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminApproveTestimonialAction =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    dispatch({ type: ADMIN_APPROVE_TESTIMONIAL_REQUEST });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_ROUTES?.adminTestimonials?.approve}${id}`,
        {},
        config
      );

      dispatch({
        type: ADMIN_APPROVE_TESTIMONIAL_SUCCESS,
        payload: data,
      });
      window.location.reload();
    } catch (error: any) {
      dispatch({
        type: ADMIN_APPROVE_TESTIMONIAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminDeleteTestimonialAction =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    dispatch({ type: ADMIN_DELETE_TESTIMONIAL_REQUEST });
    console.log(state);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.delete(
        `${API_ROUTES?.adminTestimonials?.delete}${id}`,
        config
      );

      dispatch({
        type: ADMIN_DELETE_TESTIMONIAL_SUCCESS,
        payload: data,
      });
      window.location.reload();
    } catch (error: any) {
      dispatch({
        type: ADMIN_DELETE_TESTIMONIAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const AdminUpdateTestimonialAction =
  ({ name, title, content, user_id, _id }: AdminTestimonialType) =>
  async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: ReduxResponseType<LoginResponseType> = state?.login;
    const user_type = login?.serverResponse.data.type;
    const admin_id = login?.serverResponse.data.id;

    if (user_type !== "admin") {
      dispatch({
        type: ADMIN_UPDATE_TESTIMONIAL_FAIL,
        payload: { message: "Only Admins can update Testimonials" },
      });
      return;
    }

    if (!admin_id) {
      dispatch({
        type: ADMIN_UPDATE_TESTIMONIAL_FAIL,
        payload: { message: "You need to login to update a testimonial" },
      });
      return;
    }

    if (!name) {
      dispatch({
        type: ADMIN_UPDATE_TESTIMONIAL_FAIL,
        payload: { message: "You need to fill in the name field" },
      });
      return;
    }

    if (!title) {
      dispatch({
        type: ADMIN_UPDATE_TESTIMONIAL_FAIL,
        payload: { message: "You need to fill in the title field" },
      });
      return;
    }

    if (!content) {
      dispatch({
        type: ADMIN_UPDATE_TESTIMONIAL_FAIL,
        payload: { message: "You need to fill in the content field" },
      });
      return;
    }

    if (!_id) {
      dispatch({
        type: ADMIN_UPDATE_TESTIMONIAL_FAIL,
        payload: {
          message: "Something Went Wrong, Go back and tap Edit again",
        },
      });
      return;
    }

    dispatch({ type: ADMIN_UPDATE_TESTIMONIAL_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.adminTestimonials?.update,
        { name, title, content, user_id, _id },
        config
      );

      dispatch({ type: ADMIN_UPDATE_TESTIMONIAL_SUCCESS, payload: data });
      console.log(data);
      window.history.back();
    } catch (error: any) {
      // dispatch error
      console.log(error);
      dispatch({
        type: ADMIN_UPDATE_TESTIMONIAL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
