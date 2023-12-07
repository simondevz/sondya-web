import { LOGIN_RESET } from "../constants/auth.constants";
import {
  ADD_TO_BROWSE_HISTORY_FAIL,
  ADD_TO_BROWSE_HISTORY_REQUEST,
  ADD_TO_BROWSE_HISTORY_RESET,
  ADD_TO_BROWSE_HISTORY_SUCCESS,
  VIEW_BROWSE_HISTORY_FAIL,
  VIEW_BROWSE_HISTORY_REQUEST,
  VIEW_BROWSE_HISTORY_RESET,
  VIEW_BROWSE_HISTORY_SUCCESS,
} from "../constants/browsehistory.constant";
import { initialState } from "../initial.state";
import { ActionType, ReduxResponseType } from "../types/general.types";

export const addToBrowseHistoryReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case ADD_TO_BROWSE_HISTORY_REQUEST:
      return { ...initialState, loading: true };
    case ADD_TO_BROWSE_HISTORY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case ADD_TO_BROWSE_HISTORY_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADD_TO_BROWSE_HISTORY_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const viewBrowseHistoryReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case VIEW_BROWSE_HISTORY_REQUEST:
      return { ...initialState, loading: true };
    case VIEW_BROWSE_HISTORY_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case VIEW_BROWSE_HISTORY_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case VIEW_BROWSE_HISTORY_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
