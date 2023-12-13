import { Dispatch } from "redux";
import { SHIPPING_SESSION } from "../../extraStorage/storageStore";
import {
  UPDATE_SHIPPING_DESTINATION_FAIL,
  UPDATE_SHIPPING_DESTINATION_REQUEST,
  UPDATE_SHIPPING_DESTINATION_SUCCESS,
  VIEW_SHIPPING_DESTINATION_FAIL,
  VIEW_SHIPPING_DESTINATION_REQUEST,
  VIEW_SHIPPING_DESTINATION_SUCCESS,
} from "../constants/shippingdestination.constants";
import { shippingDestinationType } from "../types/shippingdestination.types";

export const updateShippingDestinationAction =
  (destination: shippingDestinationType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      // console.log(destination);

      if (destination.country === "" || !destination.country) {
        dispatch({
          type: UPDATE_SHIPPING_DESTINATION_FAIL,
          payload: "country is missing in destination",
        });
        return;
      }
      if (destination.state === "" || !destination.state) {
        dispatch({
          type: UPDATE_SHIPPING_DESTINATION_FAIL,
          payload: "state is missing in destination",
        });
        return;
      }
      if (destination.city === "" || !destination.city) {
        dispatch({
          type: UPDATE_SHIPPING_DESTINATION_FAIL,
          payload: "city is missing in destination",
        });
        return;
      }
      if (destination.address === "" || !destination.address) {
        dispatch({
          type: UPDATE_SHIPPING_DESTINATION_FAIL,
          payload: "address is missing in destination",
        });
        return;
      }
      if (destination.zipcode === "" || !destination.zipcode) {
        dispatch({
          type: UPDATE_SHIPPING_DESTINATION_FAIL,
          payload: "zipcode is missing in destination",
        });
        return;
      }
      if (destination.phone_number === "" || !destination.phone_number) {
        dispatch({
          type: UPDATE_SHIPPING_DESTINATION_FAIL,
          payload: "phone number is missing in destination",
        });
        return;
      }

      dispatch({
        type: UPDATE_SHIPPING_DESTINATION_REQUEST,
      });

      // get existing cart from local storage
      const existingDestination: shippingDestinationType =
        JSON.parse(localStorage.getItem(SHIPPING_SESSION) as any) || {};

      let data: any = "";

      // Update existing item quantity or add new item
      if (
        existingDestination ||
        Object.keys(existingDestination).length !== 0
      ) {
        existingDestination.country = destination.country;
        existingDestination.state = destination.state;
        existingDestination.city = destination.city;
        existingDestination.address = destination.address;
        existingDestination.zipcode = destination.zipcode;
        existingDestination.phone_number = destination.phone_number;

        //save
        localStorage.setItem(
          SHIPPING_SESSION,
          JSON.stringify(existingDestination)
        );

        data = existingDestination;
      } else {
        const newDestination: shippingDestinationType = {
          _id: "",
          country: "",
          state: "",
          city: "",
          address: "",
          zipcode: "",
          phone_number: "",
        };
        newDestination._id = String(Math.floor(Math.random() * 90000) + 10000);
        newDestination.country = destination.country;
        newDestination.state = destination.state;
        newDestination.city = destination.city;
        newDestination.address = destination.address;
        newDestination.zipcode = destination.zipcode;
        newDestination.phone_number = destination.phone_number;

        //save
        localStorage.setItem(SHIPPING_SESSION, JSON.stringify(newDestination));

        data = newDestination;
      }

      dispatch({
        type: UPDATE_SHIPPING_DESTINATION_SUCCESS,
        payload: { message: "updated destination successfully", data: data },
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_SHIPPING_DESTINATION_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const viewShippingDestinationAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: VIEW_SHIPPING_DESTINATION_REQUEST,
      });

      // get existing destination from local storage
      const existingDestination: shippingDestinationType = JSON.parse(
        localStorage.getItem(SHIPPING_SESSION) as any
      );

      if (
        existingDestination ||
        Object.keys(existingDestination).length !== 0
      ) {
        dispatch({
          type: VIEW_SHIPPING_DESTINATION_SUCCESS,
          payload: {
            message: "destination gotten successfully",
            data: existingDestination,
          },
        });
      } else {
        dispatch({
          type: VIEW_SHIPPING_DESTINATION_SUCCESS,
          payload: {
            message: "destination gotten successfully",
            data: null,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: VIEW_SHIPPING_DESTINATION_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
