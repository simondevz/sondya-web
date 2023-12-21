import { Dispatch } from "redux";
import { WishlistItemType } from "../types/wishlist.types";
import {
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAIL,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_SUCCESS,
  VIEW_WISHLIST_FAIL,
  VIEW_WISHLIST_REQUEST,
  VIEW_WISHLIST_SUCCESS,
} from "../constants/wishlist.constant";
import { WISHLIST_SESSION } from "../../extraStorage/storageStore";

export const addToWishlistAction =
  (item: WishlistItemType) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ADD_TO_WISHLIST_REQUEST,
      });

      // get existing wishlist from local storage and add the new item
      const existingWishlist: WishlistItemType[] =
        JSON.parse(localStorage.getItem(WISHLIST_SESSION) as any) || [];
      existingWishlist.push(item);

      // Save updated cart to localStorage
      localStorage.setItem(WISHLIST_SESSION, JSON.stringify(existingWishlist));
      dispatch({
        type: ADD_TO_WISHLIST_SUCCESS,
        payload: {
          message: "added to wishlist successfully",
          data: existingWishlist,
        },
      });
    } catch (error: any) {
      dispatch({
        type: ADD_TO_WISHLIST_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const removeFromWishlistAction =
  (item: WishlistItemType) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: REMOVE_FROM_WISHLIST_REQUEST,
      });

      // get existing wishlist from local storage
      const existingWishlist: WishlistItemType[] =
        JSON.parse(localStorage.getItem(WISHLIST_SESSION) as any) || [];

      // Check if item already exists in wishlist
      const existingItem = existingWishlist.find(
        (wishlistItem) => wishlistItem._id === item._id
      );

      // removing item from wishlist
      existingWishlist.splice(existingWishlist.indexOf(existingItem!), 1);

      // Save updated wishlist to localStorage
      localStorage.setItem(WISHLIST_SESSION, JSON.stringify(existingWishlist));

      dispatch({
        type: REMOVE_FROM_WISHLIST_SUCCESS,
        payload: {
          message: "Item removed successfully",
          data: existingItem,
        },
      });
    } catch (error: any) {
      dispatch({
        type: REMOVE_FROM_WISHLIST_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const viewWishlistAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: VIEW_WISHLIST_REQUEST,
    });

    // get existing Wishlist from local storage
    const existingWishlist: WishlistItemType[] =
      JSON.parse(localStorage.getItem(WISHLIST_SESSION) as any) || [];
    console.log(existingWishlist);

    dispatch({
      type: VIEW_WISHLIST_SUCCESS,
      payload: {
        message: "Wishlist gotten successfully",
        data: existingWishlist,
      },
    });
  } catch (error: any) {
    dispatch({
      type: VIEW_WISHLIST_FAIL,
      payload:
        error?.response && error.response?.data?.message
          ? error?.response?.data?.message
          : error?.message,
    });
  }
};
