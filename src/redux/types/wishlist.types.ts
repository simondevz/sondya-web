import { AdminGetProductType } from "./products.types";
import { AdminGetServiceType } from "./services.types";

export type WishlistItemType = (AdminGetProductType | AdminGetServiceType) & {
  isProduct: boolean;
};
