import axios from "axios";
import { Dispatch } from "redux";
import {
  SELLER_GET_ANALYSIS_FAIL,
  SELLER_GET_ANALYSIS_REQUEST,
  SELLER_GET_ANALYSIS_SUCCESS,
} from "../../constants/seller/seller-analysis.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";

export const sellerGetAnalysisAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: SELLER_GET_ANALYSIS_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.sellerAnalysis?.getAnalysis +
          login?.serverResponse?.data?.id,
        config
      );
      dispatch({
        type: SELLER_GET_ANALYSIS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: SELLER_GET_ANALYSIS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
