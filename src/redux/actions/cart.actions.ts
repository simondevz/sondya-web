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
  UPDATE_CART_FAIL,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  VIEW_CART_FAIL,
  VIEW_CART_REQUEST,
  VIEW_CART_SUCCESS,
} from "../constants/cart.constants";
import { ProductOrderType } from "../types/productOrders.types";
import { AdminGetProductType } from "../types/products.types";

export const addToCartAction =
  (product: AdminGetProductType) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADD_TO_CART_REQUEST,
      });

      const cartOrderItem: ProductOrderType = {
        ...product,
        product_id: product._id,
        Order_quantity: 1,
        // total_price: product.current_price * this.Order_quantity,
      };
      cartOrderItem.total_price =
        cartOrderItem.current_price * cartOrderItem.Order_quantity;

      // get existing cart from local storage
      const existingCart: ProductOrderType[] =
        JSON.parse(localStorage.getItem(CART_SESSION) as any) || [];

      // Check if item already exists in cart
      const existingItem = existingCart.find(
        (cartItem) => cartItem.product_id === cartOrderItem.product_id
      );

      // Update existing item quantity or add new item
      if (existingItem) {
        existingItem.Order_quantity += cartOrderItem.Order_quantity;
        // existingItem.total_price! += cartOrderItem.Order_quantity;
        existingItem.total_price !== undefined &&
          (existingItem.total_price +=
            cartOrderItem.Order_quantity * cartOrderItem.current_price);
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

      //   const cartOrderItem: ProductOrderType = {
      //     ...product,
      //     product_id: product._id,
      //     Order_quantity: 1,
      //     // total_price: product.current_price * this.Order_quantity,
      //   };
      //   cartOrderItem.total_price =
      //     cartOrderItem.current_price * cartOrderItem.Order_quantity;

      // get existing cart from local storage
      const existingCart: ProductOrderType[] =
        JSON.parse(localStorage.getItem(CART_SESSION) as any) || [];

      // Check if item already exists in cart
      const existingItem = existingCart.find(
        (cartItem) => cartItem.product_id === productOrder.product_id
      );

      // Update existing item quantity or add new item
      if (existingItem) {
        existingItem.Order_quantity = productOrder.Order_quantity;
        // existingItem.total_price! += cartOrderItem.Order_quantity;
        existingItem.total_price !== undefined &&
          (existingItem.total_price =
            productOrder.Order_quantity * productOrder.current_price);
      }
      //    else {
      //     existingCart.push(cartOrderItem);
      //   }

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
        (cartItem) => cartItem.product_id === productOrder.product_id
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
