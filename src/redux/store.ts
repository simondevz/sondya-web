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
  adminGetProductCategoriesReducer,
  adminGetServiceCategoriesReducer,
  adminUpdateCategoryReducer,
} from "./reducers/admin/categories.reducers";
import {
  adminActivateGroupchatReducer,
  adminCreateGroupchatReducer,
  adminDeleteGroupchatReducer,
  adminGetGroupchatReducer,
  adminSuspendGroupchatReducer,
  adminUpdateGroupchatReducer,
} from "./reducers/admin/groupchat.reducers";
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
  adminApproveTestimonialsReducer,
  adminDeleteTestimonialsReducer,
  adminGetUnapprovedTestimonialsReducer,
  adminUpdateTestimonialsReducer,
} from "./reducers/admin/testimonials.reducers";
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
import {
  addToCartReducer,
  clearCartReducer,
  removeFromCartReducer,
  updateCartReducer,
  viewCartReducer,
} from "./reducers/cart.reducers";
import { CreateContactUsReducer } from "./reducers/contactus.reducers";
import {
  homeGetProductCategoryReducer,
  homeGetProductDetailReducer,
  homeGetProductsReducer,
  homeGetServiceCategoryReducer,
  homeGetServiceDetailReducer,
  homeGetServicesReducer,
} from "./reducers/home.reducers";
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
  getUserGroupChatsReducer,
  userGetGroupchatDetailsReducer,
  userGetGroupchatMembersReducer,
  userGetGroupchatsReducer,
  userGetMessagesReducer,
  userJoinGroupchatReducer,
} from "./reducers/userDashboard/groupchat.reducers";
import {
  userGetProductByIdReducer,
  userGetProductCategoriesReducer,
  userGetProductsReducer,
} from "./reducers/userDashboard/products.reducers";
import {
  GetUserProfileReducer,
  UpdatePasswordReducer,
  UpdateProfileReducer,
  UpdateSocialsReducer,
} from "./reducers/userDashboard/profile.reducers";
import {
  userGetServiceByIdReducer,
  userGetServiceCategoriesReducer,
  userGetServicesReducer,
} from "./reducers/userDashboard/services.reducers";
import {
  getApprovedTestimonialReducer,
  testimonialReducer,
} from "./reducers/userDashboard/testimonials.reducers";
import { ReduxResponseType } from "./types/general.types";
import {
  getUserChatsReducer,
  userGetChatMessagesReducer,
} from "./reducers/userDashboard/chats.reducers";
import {
  getUserReducer,
  userGetUsersReducer,
} from "./reducers/userDashboard/users.reducers";

export type ReducersType = {
  //cart system
  addToCart: ReduxResponseType;
  updateCart: ReduxResponseType;
  removeFromCart: ReduxResponseType;
  viewCart: ReduxResponseType;
  clearCart: ReduxResponseType;

  //home
  homeGetProductCategory: ReduxResponseType;
  homeGetServiceCategory: ReduxResponseType;
  homeGetProducts: ReduxResponseType;
  homeGetServices: ReduxResponseType;
  homeGetProductDetails: ReduxResponseType;
  homeGetServiceDetails: ReduxResponseType;

  //contact us
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
  adminGetProductCategories: ReduxResponseType;
  adminGetServiceCategories: ReduxResponseType;

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
  userGetUsers: ReduxResponseType;
  userGetUser: ReduxResponseType;

  // user && services
  userGetServices: ReduxResponseType;
  userGetServiceById: ReduxResponseType;
  userGetServiceCategories: ReduxResponseType;

  // user && products
  userGetProducts: ReduxResponseType;
  userGetProductById: ReduxResponseType;
  userGetProductsCategories: ReduxResponseType;

  // user && groupchats
  getUserGroupchats: ReduxResponseType;
  userGetGroupchats: ReduxResponseType;
  userGetGroupchatDetails: ReduxResponseType;
  userGetMessages: ReduxResponseType;
  userJoinGroupchat: ReduxResponseType;
  userGetGroupchatMembers: ReduxResponseType;
  userLikeMessage: ReduxResponseType;
  userSendMessage: ReduxResponseType;

  // user && chats
  userGetChatMessages: ReduxResponseType;
  getUserChats: ReduxResponseType;
};

const reducer = combineReducers<ReducersType>({
  //cart system
  addToCart: addToCartReducer,
  updateCart: updateCartReducer,
  removeFromCart: removeFromCartReducer,
  viewCart: viewCartReducer,
  clearCart: clearCartReducer,

  //home
  homeGetProductCategory: homeGetProductCategoryReducer,
  homeGetServiceCategory: homeGetServiceCategoryReducer,
  homeGetProducts: homeGetProductsReducer,
  homeGetServices: homeGetServicesReducer,
  homeGetProductDetails: homeGetProductDetailReducer,
  homeGetServiceDetails: homeGetServiceDetailReducer,

  //contact us
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
  adminGetProductCategories: adminGetProductCategoriesReducer,
  adminGetServiceCategories: adminGetServiceCategoriesReducer,

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
  userGetUsers: userGetUsersReducer,
  userGetUser: getUserReducer,

  // user && services
  userGetServices: userGetServicesReducer,
  userGetServiceById: userGetServiceByIdReducer,
  userGetServiceCategories: userGetServiceCategoriesReducer,

  // User && Products
  userGetProducts: userGetProductsReducer,
  userGetProductById: userGetProductByIdReducer,
  userGetProductsCategories: userGetProductCategoriesReducer,

  // user && groupchats
  getUserGroupchats: getUserGroupChatsReducer,
  userGetGroupchats: userGetGroupchatsReducer,
  userGetGroupchatDetails: userGetGroupchatDetailsReducer,
  userJoinGroupchat: userJoinGroupchatReducer,
  userGetGroupchatMembers: userGetGroupchatMembersReducer,
  userGetMessages: userGetMessagesReducer,
  userLikeMessage: userGetMessagesReducer,
  userSendMessage: userGetMessagesReducer,

  // user && chats
  getUserChats: getUserChatsReducer,
  userGetChatMessages: userGetChatMessagesReducer,
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
