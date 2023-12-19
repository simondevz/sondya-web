import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  SELLER_RESPOND_REVIEW_REQUEST,
  SELLER_RESPOND_REVIEW_SUCCESS,
  SELLER_RESPOND_REVIEW_FAIL,
  SELLER_RESPOND_REVIEW_RESET,
} from "../../constants/seller/seller-reviewResponse.constants";
import { initialState } from "../../initial.state";
import { ReduxResponseType, ActionType } from "../../types/general.types";

export const sellerRespondReviewReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SELLER_RESPOND_REVIEW_REQUEST:
      return { ...initialState, loading: true };
    case SELLER_RESPOND_REVIEW_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case SELLER_RESPOND_REVIEW_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SELLER_RESPOND_REVIEW_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
