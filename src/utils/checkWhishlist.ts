import { WISHLIST_SESSION } from "../extraStorage/storageStore";
import { WishlistItemType } from "../redux/types/wishlist.types";

export default function inWishlist(item: WishlistItemType) {
  // get existing wishlist from local storage
  const existingWishlist: WishlistItemType[] =
    JSON.parse(localStorage.getItem(WISHLIST_SESSION) as any) || [];

  // Check if item already exists in wishlist
  const existingItem = existingWishlist.find(
    (wishlistItem) => wishlistItem._id === item._id
  );
  return existingItem ? true : false;
}
