import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { LOGIN_SESSION } from "../extraStorage/storageStore";
import { initialState as initialStateReducer } from "./initial.state";
import {
  adminCreateCategoryReducer,
  adminDeleteCategoryReducer,
  adminGetCategoriesReducer,
  adminGetCategoryByIdReducer,
  adminUpdateCategoryReducer,
} from "./reducers/admin/categories.reducers";
import {
  adminCreateProductReducer,
  adminDeleteProductReducer,
  adminGetProductByIdReducer,
  adminGetProductsReducer,
  adminUpdateProductReducer,
} from "./reducers/admin/products.reducers";
import {
  adminCreateServiceReducer,
  adminDeleteServiceReducer,
  adminGetServiceByIdReducer,
  adminGetServicesReducer,
  adminUpdateServiceReducer,
} from "./reducers/admin/services.reducers";
import {
  adminCreateUserReducer,
  adminDeleteUserReducer,
  adminGetUserByIdReducer,
  adminGetUsersReducer,
  adminUpdateUserReducer,
} from "./reducers/admin/users.reducers";
import {
  forgotPasswordReducer,
  loginReducer,
  registerReducer,
  resetPasswordReducer,
  verifyEmailReducer,
} from "./reducers/auth.reducers";
import { CreateContactUsReducer } from "./reducers/contactus.reducers";
import {
  sellerCreateProductReducer,
  sellerDeleteProductReducer,
  sellerGetProductByIdReducer,
  sellerGetProductsReducer,
  sellerUpdateProductReducer,
} from "./reducers/seller/seller-products.reducers";
import {
  sellerCreateServiceReducer,
  sellerDeleteServiceReducer,
  sellerGetServiceByIdReducer,
  sellerGetServicesReducer,
  sellerUpdateServiceReducer,
} from "./reducers/seller/seller-services.reducers";
import {
  GetUserProfileReducer,
  UpdatePasswordReducer,
  UpdateProfileReducer,
  UpdateSocialsReducer,
} from "./reducers/userDashboard/profile.reducers";
import {
  getApprovedTestimonialReducer,
  testimonialReducer,
} from "./reducers/userDashboard/testimonials.reducers";
import { ReduxResponseType } from "./types/general.types";
import {
  adminApproveTestimonialsReducer,
  adminDeleteTestimonialsReducer,
  adminGetUnapprovedTestimonialsReducer,
  adminUpdateTestimonialsReducer,
} from "./reducers/admin/testimonials.reducers";
import {
  adminActivateGroupchatReducer,
  adminCreateGroupchatReducer,
  adminDeleteGroupchatReducer,
  adminGetGroupchatReducer,
  adminSuspendGroupchatReducer,
  adminUpdateGroupchatReducer,
} from "./reducers/admin/groupchat.reducers";

export type ReducersType = {
  contactus: ReduxResponseType;

  //auth
  register: ReduxResponseType;
  verifyEmail: ReduxResponseType;
  login: ReduxResponseType;
  forgotPassword: ReduxResponseType;
  resetPassword: ReduxResponseType;

  //user profile
  getProfile: ReduxResponseType;
  updateProfile: ReduxResponseType;
  updatePassword: ReduxResponseType;
  updateSocials: ReduxResponseType;

  // seller && products
  sellerCreateProduct: ReduxResponseType;
  sellerUpdateProduct: ReduxResponseType;
  sellerDeleteProduct: ReduxResponseType;
  sellerGetByIdProduct: ReduxResponseType;
  sellerGetAllProducts: ReduxResponseType;

  //admin && services
  sellerCreateService: ReduxResponseType;
  sellerUpdateService: ReduxResponseType;
  sellerDeleteService: ReduxResponseType;
  sellerGetByIdService: ReduxResponseType;
  sellerGetAllService: ReduxResponseType;

  //admin && users
  adminCreateUser: ReduxResponseType;
  adminUpdateUser: ReduxResponseType;
  adminDeleteUser: ReduxResponseType;
  adminGetByIdUser: ReduxResponseType;
  adminGetAllUser: ReduxResponseType;

  //admin && category
  adminCreateCategory: ReduxResponseType;
  adminUpdateCategory: ReduxResponseType;
  adminDeleteCategory: ReduxResponseType;
  adminGetByIdCategory: ReduxResponseType;
  adminGetAllCategory: ReduxResponseType;

  //admin && products
  adminCreateProduct: ReduxResponseType;
  adminUpdateProduct: ReduxResponseType;
  adminDeleteProduct: ReduxResponseType;
  adminGetByIdProduct: ReduxResponseType;
  adminGetAllProducts: ReduxResponseType;

  //admin && services
  adminCreateService: ReduxResponseType;
  adminUpdateService: ReduxResponseType;
  adminDeleteService: ReduxResponseType;
  adminGetByIdService: ReduxResponseType;
  adminGetAllService: ReduxResponseType;

  //admin && Testimonial
  adminApproveTestimonial: ReduxResponseType;
  adminUpdateTestimonial: ReduxResponseType;
  adminDeleteTestimonial: ReduxResponseType;
  adminGetUnapprovedTestimonial: ReduxResponseType;

  // admin && groupchats
  adminCreateGroupchat: ReduxResponseType;
  adminGetGroupchats: ReduxResponseType;
  adminDeleteGroupchat: ReduxResponseType;
  adminSuspendGroupchat: ReduxResponseType;
  adminActivateGroupchat: ReduxResponseType;
  adminUpdateGroupchat: ReduxResponseType;

  // user queries
  testimonial: ReduxResponseType;
  getApprovedTestimonial: ReduxResponseType;
};

const reducer = combineReducers<ReducersType>({
  contactus: CreateContactUsReducer,
  // auth
  register: registerReducer,
  verifyEmail: verifyEmailReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,

  //user profile
  getProfile: GetUserProfileReducer,
  updateProfile: UpdateProfileReducer,
  updatePassword: UpdatePasswordReducer,
  updateSocials: UpdateSocialsReducer,

  //seller && products
  sellerCreateProduct: sellerCreateProductReducer,
  sellerUpdateProduct: sellerUpdateProductReducer,
  sellerDeleteProduct: sellerDeleteProductReducer,
  sellerGetByIdProduct: sellerGetProductByIdReducer,
  sellerGetAllProducts: sellerGetProductsReducer,

  //seller && services
  sellerCreateService: sellerCreateServiceReducer,
  sellerUpdateService: sellerUpdateServiceReducer,
  sellerDeleteService: sellerDeleteServiceReducer,
  sellerGetByIdService: sellerGetServiceByIdReducer,
  sellerGetAllService: sellerGetServicesReducer,

  //admin && users
  adminCreateUser: adminCreateUserReducer,
  adminUpdateUser: adminUpdateUserReducer,
  adminDeleteUser: adminDeleteUserReducer,
  adminGetByIdUser: adminGetUserByIdReducer,
  adminGetAllUser: adminGetUsersReducer,

  //admin && category
  adminCreateCategory: adminCreateCategoryReducer,
  adminUpdateCategory: adminUpdateCategoryReducer,
  adminDeleteCategory: adminDeleteCategoryReducer,
  adminGetByIdCategory: adminGetCategoryByIdReducer,
  adminGetAllCategory: adminGetCategoriesReducer,

  //admin && products
  adminCreateProduct: adminCreateProductReducer,
  adminUpdateProduct: adminUpdateProductReducer,
  adminDeleteProduct: adminDeleteProductReducer,
  adminGetByIdProduct: adminGetProductByIdReducer,
  adminGetAllProducts: adminGetProductsReducer,

  //admin && services
  adminCreateService: adminCreateServiceReducer,
  adminUpdateService: adminUpdateServiceReducer,
  adminDeleteService: adminDeleteServiceReducer,
  adminGetByIdService: adminGetServiceByIdReducer,
  adminGetAllService: adminGetServicesReducer,

  //admin && Testimonial
  adminGetUnapprovedTestimonial: adminGetUnapprovedTestimonialsReducer,
  adminApproveTestimonial: adminApproveTestimonialsReducer,
  adminDeleteTestimonial: adminDeleteTestimonialsReducer,
  adminUpdateTestimonial: adminUpdateTestimonialsReducer,

  // admin && groupchats
  adminCreateGroupchat: adminCreateGroupchatReducer,
  adminGetGroupchats: adminGetGroupchatReducer,
  adminDeleteGroupchat: adminDeleteGroupchatReducer,
  adminSuspendGroupchat: adminSuspendGroupchatReducer,
  adminActivateGroupchat: adminActivateGroupchatReducer,
  adminUpdateGroupchat: adminUpdateGroupchatReducer,

  // user queries
  testimonial: testimonialReducer,
  getApprovedTestimonial: getApprovedTestimonialReducer,
});

const middleware = [thunk];

const initialState: any = {
  login:
    typeof window !== "undefined" && localStorage.getItem(LOGIN_SESSION)
      ? JSON.parse(localStorage.getItem(LOGIN_SESSION) as any)
      : initialStateReducer,
};

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
