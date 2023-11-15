import { Dispatch } from "redux";
import { UserTestimonialType } from "../../types/users.types";
import axios from "axios";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import {
  CREATE_TESTIMONIAL_FAIL,
  CREATE_TESTIMONIAL_REQUEST,
  CREATE_TESTIMONIAL_SUCCESS,
} from "../../constants/userDashboard/testimonials.constants";

export const createTestimonialAction =
  ({ name, title, content }: UserTestimonialType) =>
  async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const login: LoginResponseType = state?.login;
    const user_id = login?.id;

    if (!user_id) {
      dispatch({
        type: CREATE_TESTIMONIAL_FAIL,
        payload: { message: "You need to login to submit a testimonial" },
      });
      return;
    }

    if (!name) {
      dispatch({
        type: CREATE_TESTIMONIAL_FAIL,
        payload: { message: "You need to fill in the name field" },
      });
      return;
    }

    if (!title) {
      dispatch({
        type: CREATE_TESTIMONIAL_FAIL,
        payload: { message: "You need to fill in the title field" },
      });
      return;
    }

    if (!content) {
      dispatch({
        type: CREATE_TESTIMONIAL_FAIL,
        payload: { message: "You need to fill in the content field" },
      });
      return;
    }

    dispatch({ type: CREATE_TESTIMONIAL_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.users?.createTestimonial,
        { name, title, content, user_id },
        config
      );

      dispatch({ type: CREATE_TESTIMONIAL_SUCCESS, payload: data });
      console.log(data);
    } catch (error) {
      // dispatch error
      console.log(error);
      dispatch({ type: CREATE_TESTIMONIAL_FAIL, payload: error });
    }
  };
