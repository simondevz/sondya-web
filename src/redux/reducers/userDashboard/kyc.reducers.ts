import { LOGIN_RESET } from "../../constants/auth.constants";
import {
  KYC_COMPANY_INFO_FAIL,
  KYC_COMPANY_INFO_REQUEST,
  KYC_COMPANY_INFO_RESET,
  KYC_COMPANY_INFO_SUCCESS,
  KYC_CONTACT_INFO_FAIL,
  KYC_CONTACT_INFO_REQUEST,
  KYC_CONTACT_INFO_RESET,
  KYC_CONTACT_INFO_SUCCESS,
  KYC_DISPLAY_PICTURE_FAIL,
  KYC_DISPLAY_PICTURE_REQUEST,
  KYC_DISPLAY_PICTURE_RESET,
  KYC_DISPLAY_PICTURE_SUCCESS,
  KYC_DOCUMENT_FILE_FAIL,
  KYC_DOCUMENT_FILE_REQUEST,
  KYC_DOCUMENT_FILE_RESET,
  KYC_DOCUMENT_FILE_SUCCESS,
  KYC_PERSONAL_INFO_FAIL,
  KYC_PERSONAL_INFO_REQUEST,
  KYC_PERSONAL_INFO_RESET,
  KYC_PERSONAL_INFO_SUCCESS,
  KYC_VERIFY_CODE_FAIL,
  KYC_VERIFY_CODE_REQUEST,
  KYC_VERIFY_CODE_RESET,
  KYC_VERIFY_CODE_SUCCESS,
  KYC_VERIFY_EMAIL_FAIL,
  KYC_VERIFY_EMAIL_REQUEST,
  KYC_VERIFY_EMAIL_RESET,
  KYC_VERIFY_EMAIL_SUCCESS,
} from "../../constants/userDashboard/kyc.constants";
import { initialState } from "../../initial.state";
import { ActionType, ReduxResponseType } from "../../types/general.types";

export const kycVerifyEmailReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case KYC_VERIFY_EMAIL_REQUEST:
      return { ...initialState, loading: true };
    case KYC_VERIFY_EMAIL_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case KYC_VERIFY_EMAIL_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case KYC_VERIFY_EMAIL_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const kycVerifyCodeReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case KYC_VERIFY_CODE_REQUEST:
      return { ...initialState, loading: true };
    case KYC_VERIFY_CODE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case KYC_VERIFY_CODE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case KYC_VERIFY_CODE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const kycPersonalInfoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case KYC_PERSONAL_INFO_REQUEST:
      return { ...initialState, loading: true };
    case KYC_PERSONAL_INFO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case KYC_PERSONAL_INFO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case KYC_PERSONAL_INFO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const kycContactInfoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case KYC_CONTACT_INFO_REQUEST:
      return { ...initialState, loading: true };
    case KYC_CONTACT_INFO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case KYC_CONTACT_INFO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case KYC_CONTACT_INFO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const kycCompanyInfoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case KYC_COMPANY_INFO_REQUEST:
      return { ...initialState, loading: true };
    case KYC_COMPANY_INFO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case KYC_COMPANY_INFO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case KYC_COMPANY_INFO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const kycDocumentFileReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case KYC_DOCUMENT_FILE_REQUEST:
      return { ...initialState, loading: true };
    case KYC_DOCUMENT_FILE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case KYC_DOCUMENT_FILE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case KYC_DOCUMENT_FILE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};

export const kycDisplayPictureReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case KYC_DISPLAY_PICTURE_REQUEST:
      return { ...initialState, loading: true };
    case KYC_DISPLAY_PICTURE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case KYC_DISPLAY_PICTURE_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case KYC_DISPLAY_PICTURE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
