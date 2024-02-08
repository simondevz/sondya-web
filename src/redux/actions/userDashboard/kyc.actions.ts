import axios from "axios";
import { Dispatch } from "redux";
import { LOGIN_SESSION } from "../../../extraStorage/storageStore";
import {
  KYC_COMPANY_INFO_FAIL,
  KYC_COMPANY_INFO_REQUEST,
  KYC_COMPANY_INFO_SUCCESS,
  KYC_CONTACT_INFO_FAIL,
  KYC_CONTACT_INFO_REQUEST,
  KYC_CONTACT_INFO_SUCCESS,
  KYC_DISPLAY_PICTURE_FAIL,
  KYC_DISPLAY_PICTURE_REQUEST,
  KYC_DISPLAY_PICTURE_SUCCESS,
  KYC_DOCUMENT_FILE_FAIL,
  KYC_DOCUMENT_FILE_REQUEST,
  KYC_DOCUMENT_FILE_SUCCESS,
  KYC_PERSONAL_INFO_FAIL,
  KYC_PERSONAL_INFO_REQUEST,
  KYC_PERSONAL_INFO_SUCCESS,
  KYC_VERIFY_CODE_FAIL,
  KYC_VERIFY_CODE_REQUEST,
  KYC_VERIFY_CODE_SUCCESS,
  KYC_VERIFY_EMAIL_FAIL,
  KYC_VERIFY_EMAIL_REQUEST,
  KYC_VERIFY_EMAIL_SUCCESS,
} from "../../constants/userDashboard/kyc.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { CompanyDetailsType } from "../../types/company_details.types";
import { ReduxResponseType } from "../../types/general.types";
import {
  kycContactInfoType,
  kycDisplayPictureType,
  kycDocumentFileType,
  kycPersonalInfoType,
} from "../../types/kyc.types";

export const kycVerifyEmailAction =
  ({ email }: { email: string }) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: KYC_VERIFY_EMAIL_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.kyc?.verifyEmail,
        {
          email,
        },
        config
      );
      dispatch({
        type: KYC_VERIFY_EMAIL_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: KYC_VERIFY_EMAIL_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const kycVerifyCodeAction =
  ({ code }: { code: string }) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: KYC_VERIFY_CODE_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.kyc?.verifyCode + login?.serverResponse?.data?.id,
        {
          code,
        },
        config
      );
      dispatch({
        type: KYC_VERIFY_CODE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: KYC_VERIFY_CODE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const kycPersonalInfoAction =
  ({
    first_name,
    last_name,
    gender,
    marital_status,
    date_of_birth,
  }: kycPersonalInfoType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: KYC_PERSONAL_INFO_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.kyc?.personalInfo + login?.serverResponse?.data?.id,
        {
          first_name,
          last_name,
          gender,
          marital_status,
          date_of_birth,
        },
        config
      );
      dispatch({
        type: KYC_PERSONAL_INFO_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: KYC_PERSONAL_INFO_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const kycContactInfoAction =
  ({ address, phone_number, city, state, country }: kycContactInfoType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: KYC_CONTACT_INFO_REQUEST,
      });

      const state1 = getState();
      const login: ReduxResponseType<LoginResponseType> = state1?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.kyc?.contactInfo + login?.serverResponse?.data?.id,
        {
          address,
          phone_number,
          city,
          state,
          country,
        },
        config
      );
      dispatch({
        type: KYC_CONTACT_INFO_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: KYC_CONTACT_INFO_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const kycCompanyInfoAction =
  ({
    company_name,
    company_website,
    company_email,
    contact_person_name,
    contact_person_number,
  }: CompanyDetailsType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: KYC_COMPANY_INFO_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const company_details: CompanyDetailsType = {
        company_name,
        company_website,
        company_email,
        contact_person_name,
        contact_person_number,
      };

      const { data, status } = await axios.put(
        API_ROUTES?.kyc?.companyInfo + login?.serverResponse?.data?.id,
        {
          company_details: company_details,
        },
        config
      );

      // update local storage for email verified and kyc completed
      if (status === 200 || status === 201) {
        login.serverResponse.data.email_verified = true;
        login.serverResponse.data.kyc_completed = true;
        if (typeof window !== "undefined") {
          localStorage.setItem(LOGIN_SESSION, JSON.stringify(login));
        }
      }

      dispatch({
        type: KYC_COMPANY_INFO_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: KYC_COMPANY_INFO_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const kycDocumentFileAction =
  ({ image }: kycDocumentFileType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: KYC_DOCUMENT_FILE_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.put(
        API_ROUTES?.kyc?.documentFile + login?.serverResponse?.data?.id,
        formData,
        config
      );

      dispatch({
        type: KYC_DOCUMENT_FILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: KYC_DOCUMENT_FILE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const kycDisplayPictureAction =
  ({ image }: kycDisplayPictureType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: KYC_DISPLAY_PICTURE_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };
      const formData = new FormData();
      if (image) {
        formData.append("image", image as File);
      }

      const { data } = await axios.put(
        API_ROUTES?.kyc?.displayPicture + login?.serverResponse?.data?.id,
        formData,
        config
      );
      dispatch({
        type: KYC_DISPLAY_PICTURE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: KYC_DISPLAY_PICTURE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
