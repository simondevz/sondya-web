import axios from "axios";
import { Dispatch } from "redux";
import {
  ADMIN_CREATE_USER_FAIL,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_CREATE_USER_SUCCESS,
} from "../../constants/admin/users.constants";
import { API_ROUTES } from "../../routes";
import { adminCreateUserType } from "../../types/users.types";

export const registerAction =
  ({ first_name, last_name, email, password, username }: adminCreateUserType) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ADMIN_CREATE_USER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.auth?.register,
        { first_name, last_name, email, username, password },
        config
      );
      dispatch({
        type: ADMIN_CREATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_CREATE_USER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
