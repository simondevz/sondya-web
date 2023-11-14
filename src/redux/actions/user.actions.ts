import { Dispatch } from "redux";
import { UserTestimonialType } from "../types/users.types";
import axios from "axios";
import { API_ROUTES } from "../routes";
import { LOGIN_SESSION } from "../../extraStorage/storageStore";
import {
  TESTIMONIAL_ERROR,
  TESTIMONIAL_LOADING,
  TESTIMONIAL_SUCCESS,
} from "../constants/auth.constants";

export const createTestimonialAction =
  ({ name, title, date, content }: UserTestimonialType) =>
  async (dispatch: Dispatch) => {
    const userString = localStorage.getItem(LOGIN_SESSION) || "{}";
    const user_id = JSON.parse(userString)?.id;

    if (!user_id) {
      dispatch({
        type: TESTIMONIAL_ERROR,
        payload: { message: "You need to login to submit a testimonial" },
      });
      return;
    }

    dispatch({ type: TESTIMONIAL_LOADING });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.users?.createTestimonial,
        { name, title, date, content, user_id },
        config
      );

      dispatch({ type: TESTIMONIAL_SUCCESS, payload: data });
      console.log(data);
    } catch (error) {
      // dispatch error
      console.log(error);
      dispatch({ type: TESTIMONIAL_ERROR, payload: error });
    }
  };
