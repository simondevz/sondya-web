import axios from "axios";
import { Dispatch } from "redux";
import {
  GET_PROFILE_DATA_FAIL,
  GET_PROFILE_DATA_REQUEST,
  GET_PROFILE_DATA_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  UPDATE_COMPANY_DETAILS_FAIL,
  UPDATE_COMPANY_DETAILS_REQUEST,
  UPDATE_COMPANY_DETAILS_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "../../constants/userDashboard/profile.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { CompanyDetailsType } from "../../types/company_details.types";
import { ReduxResponseType } from "../../types/general.types";
import {
  passwordUpdateType,
  profileUpdateType,
  socialsUpdateType,
} from "../../types/users.types";

export const GetUserProfileAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_PROFILE_REQUEST,
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
        API_ROUTES?.profile?.getProfile + login?.serverResponse?.data?.id,
        config
      );
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_PROFILE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UpdateProfileAction =
  (profileUpdateData: profileUpdateType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_REQUEST,
      });

      const state1 = getState();
      const login: ReduxResponseType<LoginResponseType> = state1?.login;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const formData = new FormData();
      formData.append("first_name", profileUpdateData?.first_name);
      formData.append("last_name", profileUpdateData?.last_name);
      formData.append("username", profileUpdateData?.username);
      formData.append("email", profileUpdateData?.email);
      formData.append("phone_number", profileUpdateData?.phone_number);
      formData.append("state", profileUpdateData?.state);
      formData.append("country", profileUpdateData?.country);
      formData.append("zip_code", profileUpdateData?.zip_code);
      //new
      formData.append("city", profileUpdateData?.city);
      formData.append("currency", profileUpdateData?.currency);
      formData.append("language", profileUpdateData?.language);
      formData.append("address", profileUpdateData?.address);

      //  Because formData will not accept data type of blob|undefined
      if (profileUpdateData?.files) {
        const profilePicture: Array<Blob> = profileUpdateData.files;
        for (let index = 0; index < profilePicture.length; index++) {
          formData.append("image", profilePicture[index]);
        }
      }

      const { data } = await axios.put(
        API_ROUTES?.profile?.updateProfile + login?.serverResponse?.data?.id,
        formData,
        config
      );
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UpdatePasswordAction =
  ({ current_password, new_password, confirm_password }: passwordUpdateType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: UPDATE_PASSWORD_REQUEST,
      });

      const state1 = getState();
      const login: ReduxResponseType<LoginResponseType> = state1?.login;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };
      const { data } = await axios.put(
        API_ROUTES?.profile?.changePassword + login?.serverResponse?.data?.id,
        {
          current_password,
          new_password,
          confirm_password,
        },
        config
      );
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UpdateSocialsAction =
  ({
    facebook_url,
    linkedin_url,
    youtube_url,
    instagram_url,
    twitter_url,
    tiktok_url,
  }: socialsUpdateType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_REQUEST,
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
        API_ROUTES?.profile?.updateSocials + login?.serverResponse?.data?.id,
        {
          facebook_url,
          linkedin_url,
          youtube_url,
          instagram_url,
          twitter_url,
          tiktok_url,
        },
        config
      );
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UpdateCompanyDetailsAction =
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
        type: UPDATE_COMPANY_DETAILS_REQUEST,
      });

      const state1 = getState();
      const login: ReduxResponseType<LoginResponseType> = state1?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const company_details: string = JSON.stringify({
        company_name,
        company_website,
        company_email,
        contact_person_name,
        contact_person_number,
      });

      const { data } = await axios.put(
        API_ROUTES?.profile?.updateCompanyDetails +
          login?.serverResponse?.data?.id,
        {
          company_details,
        },
        config
      );
      dispatch({
        type: UPDATE_COMPANY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_COMPANY_DETAILS_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const GetUserProfileDataAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GET_PROFILE_DATA_REQUEST,
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
        API_ROUTES?.profile?.getProfileData + login?.serverResponse?.data?.id,
        config
      );
      dispatch({
        type: GET_PROFILE_DATA_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_PROFILE_DATA_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
