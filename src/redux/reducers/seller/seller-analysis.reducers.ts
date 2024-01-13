import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  SELLER_GET_ANALYSIS_FAIL,
  SELLER_GET_ANALYSIS_REQUEST,
  SELLER_GET_ANALYSIS_RESET,
  SELLER_GET_ANALYSIS_SUCCESS,
} from "../../constants/seller/seller-analysis.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const getSellerAnalysisReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_GET_ANALYSIS_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_GET_ANALYSIS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_GET_ANALYSIS_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_GET_ANALYSIS_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
