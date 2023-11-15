import axios from "axios";
import { Dispatch } from "redux";
import {
  CONTACT_US_FAIL,
  CONTACT_US_REQUEST,
  CONTACT_US_SUCCESS,
} from "../constants/contactus.constants";
import { API_ROUTES } from "../routes";
import { CreateContactUsType } from "../types/contactus.types";

export const CreateContactUsAction =
  ({ name, email, subject, message }: CreateContactUsType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: CONTACT_US_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.landingPages.contactUs,
        { name, email, subject, message },
        config
      );
      dispatch({
        type: CONTACT_US_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: CONTACT_US_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
