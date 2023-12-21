import { Dispatch } from "redux";
import { CART_SESSION } from "../../extraStorage/storageStore";
import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  CLEAR_CART_FAIL,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  TOTAL_CART_FAIL,
  TOTAL_CART_REQUEST,
  TOTAL_CART_SUCCESS,
  UPDATE_CART_FAIL,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  VIEW_CART_FAIL,
  VIEW_CART_REQUEST,
  VIEW_CART_SUCCESS,
} from "../constants/cart.constants";
import { ProductOrderType } from "../types/productOrders.types";
import { AdminGetProductType } from "../types/products.types";
import { TrackDistanceTimeType } from "../types/shippingdestination.types";

export const addToCartAction =
  (product: AdminGetProductType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADD_TO_CART_REQUEST,
      });

      const cartOrderItem: ProductOrderType = {
        ...product,
        _id: product._id,
        order_quantity: 1,

        sub_total: product.current_price,
        shipping_fee: 21,
        tax: 1,
        discount: 3,

        // total_price: product.current_price * this.Order_quantity,
      };

      cartOrderItem.total_price =
        cartOrderItem.current_price * cartOrderItem.order_quantity +
        cartOrderItem.shipping_fee +
        cartOrderItem.tax -
        cartOrderItem.discount;

      // get existing cart from local storage
      const existingCart: ProductOrderType[] =
        JSON.parse(localStorage.getItem(CART_SESSION) as any) || [];

      // Check if item already exists in cart
      const existingItem = existingCart.find(
        (cartItem) => cartItem._id === cartOrderItem._id
      );

      // Update existing item quantity or add new item
      if (existingItem) {
        existingItem.order_quantity += cartOrderItem.order_quantity;
        // existingItem.total_price! += cartOrderItem.Order_quantity;
        existingItem.total_price !== undefined &&
          (existingItem.total_price +=
            cartOrderItem.order_quantity * cartOrderItem.current_price);
      } else {
        existingCart.push(cartOrderItem);
      }

      // Save updated cart to localStorage
      localStorage.setItem(CART_SESSION, JSON.stringify(existingCart));

      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: { message: "added to cart successfully", data: existingCart },
      });
    } catch (error: any) {
      dispatch({
        type: ADD_TO_CART_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const updateCartAction =
  (productOrder: ProductOrderType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: UPDATE_CART_REQUEST,
      });

      // get existing cart from local storage
      const existingCart: ProductOrderType[] =
        JSON.parse(localStorage.getItem(CART_SESSION) as any) || [];

      // Check if item already exists in cart
      const existingItem = existingCart.find(
        (cartItem) => cartItem._id === productOrder._id
      );

      // Update existing item quantity or add new item
      if (existingItem) {
        existingItem.order_quantity = productOrder.order_quantity;
        // existingItem.total_price! += cartOrderItem.Order_quantity;

        existingItem.sub_total =
          existingItem.current_price * existingItem.order_quantity;

        existingItem.total_price !== undefined &&
          (existingItem.total_price =
            existingItem.current_price * existingItem.order_quantity +
            existingItem.shipping_fee +
            existingItem.tax -
            existingItem.discount);

        // existingItem.total_price !== undefined &&
        //   (existingItem.total_price =
        //     productOrder.order_quantity * productOrder.current_price);
      }

      // Save updated cart to localStorage
      localStorage.setItem(CART_SESSION, JSON.stringify(existingCart));

      dispatch({
        type: UPDATE_CART_SUCCESS,
        payload: { message: "cart Updated successfully", data: existingCart },
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_CART_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const removeFromCartAction =
  (productOrder: ProductOrderType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: REMOVE_FROM_CART_REQUEST,
      });

      // get existing cart from local storage
      const existingCart: ProductOrderType[] =
        JSON.parse(localStorage.getItem(CART_SESSION) as any) || [];

      // Check if item already exists in cart
      const existingItem = existingCart.find(
        (cartItem) => cartItem._id === productOrder._id
      );

      // removing item from cart
      existingCart.splice(existingCart.indexOf(existingItem!), 1);

      // Save updated cart to localStorage
      localStorage.setItem(CART_SESSION, JSON.stringify(existingCart));

      dispatch({
        type: REMOVE_FROM_CART_SUCCESS,
        payload: {
          message: "cart removed successfully successfully",
          data: existingCart,
        },
      });
    } catch (error: any) {
      dispatch({
        type: REMOVE_FROM_CART_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const viewCartAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: VIEW_CART_REQUEST,
      });

      // get existing cart from local storage
      const existingCart: ProductOrderType[] =
        JSON.parse(localStorage.getItem(CART_SESSION) as any) || [];

      dispatch({
        type: VIEW_CART_SUCCESS,
        payload: {
          message: "cart gottern successfully successfully",
          data: existingCart,
        },
      });
    } catch (error: any) {
      dispatch({
        type: VIEW_CART_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const clearCartAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: CLEAR_CART_REQUEST,
      });

      // Clear the existing cart from local storage
      localStorage.removeItem(CART_SESSION);

      // get existing cart from local storage
      const existingCart: ProductOrderType[] =
        JSON.parse(localStorage.getItem(CART_SESSION) as any) || [];

      dispatch({
        type: CLEAR_CART_SUCCESS,
        payload: {
          message: "cart cleared successfully",
          data: existingCart,
        },
      });
    } catch (error: any) {
      dispatch({
        type: CLEAR_CART_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const totalCartAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: TOTAL_CART_REQUEST,
      });

      // get existing cart from local storage
      const existingCart: ProductOrderType[] =
        JSON.parse(localStorage.getItem(CART_SESSION) as any) || [];

      const total: number = existingCart.length;

      dispatch({
        type: TOTAL_CART_SUCCESS,
        payload: {
          message: "cart totalled successfully",
          data: total,
        },
      });
    } catch (error: any) {
      dispatch({
        type: TOTAL_CART_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UpdateCartTimeDistanceAction =
  (trackDistanceTime: TrackDistanceTimeType[]) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: UPDATE_CART_REQUEST,
      });

      // get existing cart from local storage
      const existingCart: ProductOrderType[] =
        JSON.parse(localStorage.getItem(CART_SESSION) as any) || [];

      // console.log(trackDistanceTime);
      // console.log(existingCart);

      trackDistanceTime.forEach((item) => {
        // Check if item exists in cart
        const existingItem = existingCart.find(
          (cartItem) => cartItem._id === item._id
        );

        // Update existing item quantity or add new item
        if (existingItem) {
          existingItem.track_distance_time = item;
        }
      });
      // Save updated cart to localStorage
      localStorage.setItem(CART_SESSION, JSON.stringify(existingCart));

      dispatch({
        type: UPDATE_CART_SUCCESS,
        payload: { message: "cart Updated successfully", data: existingCart },
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_CART_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
