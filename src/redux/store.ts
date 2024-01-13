import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { LOGIN_SESSION } from "../extraStorage/storageStore";
import { initialState as initialStateReducer } from "./initial.state";
import {
  adminDeleteWithdrawalReducer,
  adminGetPendingWithdrawalsReducer,
  adminGetWithdrawalByIDReducer,
  adminGetWithdrawalHistoryReducer,
  adminWithdrawalPaymentReducer,
} from "./reducers/admin/admin-withdrawal.reducers";
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
  adminGetPaymentsByIdReducer,
  adminGetPaymentsReducer,
} from "./reducers/admin/payments.reducers";
import {
  adminDeleteProductOrderByIDReducer,
  adminGetProductOrderByIDReducer,
  adminGetProductsOrdersReducer,
} from "./reducers/admin/productOrder.reducers";
import {
  adminCreateProductReducer,
  adminDeleteProductReducer,
  adminGetProductByIdReducer,
  adminGetProductsReducer,
  adminUpdateProductReducer,
} from "./reducers/admin/products.reducers";
import {
  adminDeleteServiceOrderByIDReducer,
  adminGetServiceOrderByIDReducer,
  adminGetServiceOrdersReducer,
} from "./reducers/admin/serviceOrder.reducers";
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
  adminGetUsersOrdersReducer,
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
  totalCartReducer,
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
  youMayLikeProductsReducer,
  youMayLikeServicesReducer,
} from "./reducers/home.reducers";
import {
  createSellerNotificationReducer,
  createUserNotificationReducer,
  deleteNotificationReducer,
  get4NotificationsReducer,
  getNotificationUnseenCountReducer,
  getNotificationsReducer,
  markNotificationSeenReducer,
} from "./reducers/notifications.reducers";
import { getSellerServiceOrdersReducer } from "./reducers/seller/seler-service-orders";
import {
  sellerAddBankAccountReducer,
  sellerAddPayoneerReducer,
  sellerAddPaypalReducer,
  sellerDeleteBankAccountReducer,
  sellerDeletePayoneerReducer,
  sellerDeletePaypalReducer,
  sellerGetBalanceReducer,
} from "./reducers/seller/seller-accounts.reducers";
import { getSellerAnalysisReducer } from "./reducers/seller/seller-analysis.reducers";
import {
  sellerDeleteProductOrderByIDReducer,
  sellerGetProductOrderByIDReducer,
  sellerGetProductsOrdersReducer,
  sellerUpdateProductsOrderReducer,
} from "./reducers/seller/seller-orders.reducers";
import {
  sellerCreateProductReducer,
  sellerDeleteProductReducer,
  sellerGetProductByIdReducer,
  sellerGetProductsReducer,
  sellerUpdateProductReducer,
} from "./reducers/seller/seller-products.reducers";
import { sellerRespondReviewReducer } from "./reducers/seller/seller-reviewResponse.reducers";
import {
  sellerCreateServiceReducer,
  sellerDeleteServiceReducer,
  sellerGetServiceByIdReducer,
  sellerGetServicesReducer,
  sellerUpdateServiceReducer,
} from "./reducers/seller/seller-services.reducers";
import {
  sellerDeleteWithdrawalsReducer,
  sellerGetWithdrawalByIdReducer,
  sellerGetWithdrawalsReducer,
  sellerWithdrawalReducer,
} from "./reducers/seller/seller-withdrawal.reducers";
import {
  trackDistanceTimeReducer,
  updateShippingDestinationReducer,
  viewShippingDestinationReducer,
} from "./reducers/shippingdestination.reducers";
import {
  getSubscribersReducer,
  subscribeReducer,
} from "./reducers/subscribers.reducer";
import {
  getUserChatsReducer,
  userGetChatMessagesReducer,
  userSendChatMessageReducer,
} from "./reducers/userDashboard/chats.reducers";
import { orderEmailNotificationReducer } from "./reducers/userDashboard/emailNotification.reducers";
import {
  getUserGroupChatsReducer,
  userGetGroupchatDetailsReducer,
  userGetGroupchatMembersReducer,
  userGetGroupchatsReducer,
  userGetMessagesReducer,
  userJoinGroupchatReducer,
} from "./reducers/userDashboard/groupchat.reducers";
import {
  initializePaymentsReducer,
  userGetPaymentsByIdReducer,
  userGetPaymentsReducer,
  verifyPaymentsReducer,
} from "./reducers/userDashboard/payments.reducers";
import {
  userCreateProductOrderReducer,
  userGetProductOrderByIDReducer,
  userGetProductsOrderByOrderIdReducer,
  userGetProductsOrdersReducer,
} from "./reducers/userDashboard/productOrder.reducers";
import {
  userGetNewProductsReducer,
  userGetProductByIdReducer,
  userGetProductCategoriesReducer,
  userGetProductsReducer,
  userGetTopRatedProductsReducer,
} from "./reducers/userDashboard/products.reducers";
import {
  GetProfileDataReducer,
  GetUserProfileReducer,
  UpdateCompanyDetailsReducer,
  UpdatePasswordReducer,
  UpdateProfileReducer,
  UpdateSocialsReducer,
} from "./reducers/userDashboard/profile.reducers";
import {
  listReviewReducer,
  reviewStatReducer,
  userCreateReviewReducer,
} from "./reducers/userDashboard/reviews.reducers";
import {
  createServiceOrderReducer,
  getServiceOrderByIdReducer,
  getServiceOrdersReducer,
  updateServiceOrderReducer,
  updateTermsReducer,
} from "./reducers/userDashboard/serviceOrder.reducers";
import {
  userGetNewServicesReducer,
  userGetServiceByIdReducer,
  userGetServiceCategoriesReducer,
  userGetServicesReducer,
  userGetTopRatedServicesReducer,
} from "./reducers/userDashboard/services.reducers";
import {
  getApprovedTestimonialReducer,
  testimonialReducer,
} from "./reducers/userDashboard/testimonials.reducers";
import {
  getUserReducer,
  userGetUsersReducer,
} from "./reducers/userDashboard/users.reducers";
import {
  addToWishlistReducer,
  removeFromWishlistReducer,
  viewWishlistReducer,
} from "./reducers/wishlist.reducers";
import { ReduxResponseType } from "./types/general.types";

export type ReducersType = {
  //cart system
  addToCart: ReduxResponseType;
  updateCart: ReduxResponseType;
  removeFromCart: ReduxResponseType;
  viewCart: ReduxResponseType;
  clearCart: ReduxResponseType;
  totalCart: ReduxResponseType;

  //Wishlist system
  addToWishlist: ReduxResponseType;
  removeFromWishlist: ReduxResponseType;
  viewWishlist: ReduxResponseType;

  //destination to local storage
  updateShippingDestination: ReduxResponseType;
  viewShippingDestination: ReduxResponseType;
  trackDistanceTime: ReduxResponseType;

  //home
  homeGetProductCategory: ReduxResponseType;
  homeGetServiceCategory: ReduxResponseType;
  homeGetProducts: ReduxResponseType;
  homeGetServices: ReduxResponseType;
  homeGetProductDetails: ReduxResponseType;
  homeGetServiceDetails: ReduxResponseType;
  youMayLikeProducts: ReduxResponseType;
  youMayLikeServices: ReduxResponseType;
  subscribe: ReduxResponseType;
  getSubscribers: ReduxResponseType;

  //contact us
  contactus: ReduxResponseType;

  //auth
  register: ReduxResponseType;
  verifyEmail: ReduxResponseType;
  login: ReduxResponseType;
  forgotPassword: ReduxResponseType;
  resetPassword: ReduxResponseType;

  // user && Email notification
  orderEmailNotification: ReduxResponseType;

  //user profile
  getProfile: ReduxResponseType;
  getProfileData: ReduxResponseType;
  updateProfile: ReduxResponseType;
  updatePassword: ReduxResponseType;
  updateSocials: ReduxResponseType;
  updateCompanyDetails: ReduxResponseType;

  // user && Products orders
  userCreateProductOrder: ReduxResponseType;
  userGetProductOrders: ReduxResponseType;
  userGetProductOrderById: ReduxResponseType;
  userGetProductOrderByOrderId: ReduxResponseType;

  // user && SERVICE orders
  updateTerms: ReduxResponseType;
  createServiceOrder: ReduxResponseType;
  getServiceOrderById: ReduxResponseType;
  getServiceOrders: ReduxResponseType;
  updateServiceOrders: ReduxResponseType;

  //user && payments
  initializePayments: ReduxResponseType;
  verifyPayments: ReduxResponseType;
  userGetPayments: ReduxResponseType;
  userGetPaymentsById: ReduxResponseType;

  //admin && payments
  adminGetPayments: ReduxResponseType;
  adminGetPaymentsById: ReduxResponseType;

  // admin && Products orders
  adminGetProductsOrders: ReduxResponseType;
  adminGetProductsOrderByID: ReduxResponseType;
  adminDeleteProductsOrderById: ReduxResponseType;

  // seller && analysis
  sellerGetAnalysis: ReduxResponseType;

  // seller && Products orders
  sellerGetProductsOrders: ReduxResponseType;
  sellerGetProductsOrderByID: ReduxResponseType;
  sellerDeleteProductsOrderById: ReduxResponseType;
  sellerUpdateProductsOrder: ReduxResponseType;

  // seller && service orders
  getSellerServiceOrders: ReduxResponseType;

  // seller && products
  sellerCreateProduct: ReduxResponseType;
  sellerUpdateProduct: ReduxResponseType;
  sellerDeleteProduct: ReduxResponseType;
  sellerGetByIdProduct: ReduxResponseType;
  sellerGetAllProducts: ReduxResponseType;

  //seller and account
  sellerGetBalance: ReduxResponseType;
  sellerAddBankAccount: ReduxResponseType;
  sellerAddPaypalAccount: ReduxResponseType;
  sellerAddPayoneerAccount: ReduxResponseType;
  sellerDeleteBankAccount: ReduxResponseType;
  sellerDeletePaypalAccount: ReduxResponseType;
  sellerDeletePayoneerAccount: ReduxResponseType;

  //seller and withdrawal
  sellerWithdraw: ReduxResponseType;
  sellerGetWithdrawals: ReduxResponseType;
  sellerGetWithdrawalById: ReduxResponseType;
  sellerDeleteWithdrawal: ReduxResponseType;

  // admin and withdrawal
  adminWithdrawalPayment: ReduxResponseType;
  adminGetPendingWithdrawal: ReduxResponseType;
  adminGetWithdrawals: ReduxResponseType;
  adminGetWithdrawalById: ReduxResponseType;
  adminDeleteWithdrawal: ReduxResponseType;

  //admin && services
  sellerCreateService: ReduxResponseType;
  sellerUpdateService: ReduxResponseType;
  sellerDeleteService: ReduxResponseType;
  sellerGetByIdService: ReduxResponseType;
  sellerGetAllService: ReduxResponseType;

  //admin && services orders
  adminGetServiceOrders: ReduxResponseType;
  adminGetServiceOrderById: ReduxResponseType;
  adminDeleteServiceOrderByIds: ReduxResponseType;

  //admin && users
  adminCreateUser: ReduxResponseType;
  adminUpdateUser: ReduxResponseType;
  adminDeleteUser: ReduxResponseType;
  adminGetByIdUser: ReduxResponseType;
  adminGetAllUser: ReduxResponseType;
  adminGetUserOrders: ReduxResponseType;

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
  userGetNewServices: ReduxResponseType;
  userGetTopRatedServices: ReduxResponseType;
  userGetServiceById: ReduxResponseType;
  userGetServiceCategories: ReduxResponseType;

  // user && products
  userGetProducts: ReduxResponseType;
  userGetNewProducts: ReduxResponseType;
  userGetTopRatedProducts: ReduxResponseType;
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
  userSendChatMessage: ReduxResponseType;
  getUserChats: ReduxResponseType;

  // user && reviews
  userCreateReview: ReduxResponseType;
  reviewStat: ReduxResponseType;
  reviewsList: ReduxResponseType;

  // USER && NOTIFICATIONS
  createUserNotification: ReduxResponseType;
  createSellerNotification: ReduxResponseType;
  getNotifications: ReduxResponseType;
  get4Notifications: ReduxResponseType;
  markNotificationSeen: ReduxResponseType;
  getNotificationUnseenCount: ReduxResponseType;
  deleteNotification: ReduxResponseType;

  // seller && reviews
  reviewResponse: ReduxResponseType;
};

const reducer = combineReducers<ReducersType>({
  //cart system
  addToCart: addToCartReducer,
  updateCart: updateCartReducer,
  removeFromCart: removeFromCartReducer,
  viewCart: viewCartReducer,
  clearCart: clearCartReducer,
  totalCart: totalCartReducer,

  //wishlist system
  addToWishlist: addToWishlistReducer,
  removeFromWishlist: removeFromWishlistReducer,
  viewWishlist: viewWishlistReducer,

  //destination to local storage
  updateShippingDestination: updateShippingDestinationReducer,
  viewShippingDestination: viewShippingDestinationReducer,
  trackDistanceTime: trackDistanceTimeReducer,

  //home
  homeGetProductCategory: homeGetProductCategoryReducer,
  homeGetServiceCategory: homeGetServiceCategoryReducer,
  homeGetProducts: homeGetProductsReducer,
  homeGetServices: homeGetServicesReducer,
  homeGetProductDetails: homeGetProductDetailReducer,
  homeGetServiceDetails: homeGetServiceDetailReducer,
  youMayLikeProducts: youMayLikeProductsReducer,
  youMayLikeServices: youMayLikeServicesReducer,
  subscribe: subscribeReducer,
  getSubscribers: getSubscribersReducer,

  //contact us
  contactus: CreateContactUsReducer,

  // auth
  register: registerReducer,
  verifyEmail: verifyEmailReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,

  // user && Email notification
  orderEmailNotification: orderEmailNotificationReducer,

  //user profile
  getProfile: GetUserProfileReducer,
  getProfileData: GetProfileDataReducer,
  updateProfile: UpdateProfileReducer,
  updatePassword: UpdatePasswordReducer,
  updateSocials: UpdateSocialsReducer,
  updateCompanyDetails: UpdateCompanyDetailsReducer,

  // user && Products orders
  userCreateProductOrder: userCreateProductOrderReducer,
  userGetProductOrders: userGetProductsOrdersReducer,
  userGetProductOrderById: userGetProductOrderByIDReducer,
  userGetProductOrderByOrderId: userGetProductsOrderByOrderIdReducer,

  // user && SERVICE orders
  updateTerms: updateTermsReducer,
  createServiceOrder: createServiceOrderReducer,
  getServiceOrderById: getServiceOrderByIdReducer,
  getServiceOrders: getServiceOrdersReducer,
  updateServiceOrders: updateServiceOrderReducer,

  //user && payments
  initializePayments: initializePaymentsReducer,
  verifyPayments: verifyPaymentsReducer,
  userGetPayments: userGetPaymentsReducer,
  userGetPaymentsById: userGetPaymentsByIdReducer,

  //admin && payments
  adminGetPayments: adminGetPaymentsReducer,
  adminGetPaymentsById: adminGetPaymentsByIdReducer,

  // admin && Products orders
  adminGetProductsOrders: adminGetProductsOrdersReducer,
  adminGetProductsOrderByID: adminGetProductOrderByIDReducer,
  adminDeleteProductsOrderById: adminDeleteProductOrderByIDReducer,

  // seller and analysis
  sellerGetAnalysis: getSellerAnalysisReducer,

  // seller and product orders
  sellerGetProductsOrders: sellerGetProductsOrdersReducer,
  sellerGetProductsOrderByID: sellerGetProductOrderByIDReducer,
  sellerDeleteProductsOrderById: sellerDeleteProductOrderByIDReducer,
  sellerUpdateProductsOrder: sellerUpdateProductsOrderReducer,

  // seller and service orders
  getSellerServiceOrders: getSellerServiceOrdersReducer,

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

  //seller and accounts
  sellerGetBalance: sellerGetBalanceReducer,
  sellerAddBankAccount: sellerAddBankAccountReducer,
  sellerAddPayoneerAccount: sellerAddPayoneerReducer,
  sellerAddPaypalAccount: sellerAddPaypalReducer,
  sellerDeleteBankAccount: sellerDeleteBankAccountReducer,
  sellerDeletePayoneerAccount: sellerDeletePayoneerReducer,
  sellerDeletePaypalAccount: sellerDeletePaypalReducer,

  //seller && withdrawals
  sellerGetWithdrawals: sellerGetWithdrawalsReducer,
  sellerWithdraw: sellerWithdrawalReducer,
  sellerGetWithdrawalById: sellerGetWithdrawalByIdReducer,
  sellerDeleteWithdrawal: sellerDeleteWithdrawalsReducer,

  //admin && withdrawals
  adminWithdrawalPayment: adminWithdrawalPaymentReducer,
  adminDeleteWithdrawal: adminDeleteWithdrawalReducer,
  adminGetPendingWithdrawal: adminGetPendingWithdrawalsReducer,
  adminGetWithdrawalById: adminGetWithdrawalByIDReducer,
  adminGetWithdrawals: adminGetWithdrawalHistoryReducer,

  //admin && users
  adminCreateUser: adminCreateUserReducer,
  adminUpdateUser: adminUpdateUserReducer,
  adminDeleteUser: adminDeleteUserReducer,
  adminGetByIdUser: adminGetUserByIdReducer,
  adminGetUserOrders: adminGetUsersOrdersReducer,
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
  userGetNewServices: userGetNewServicesReducer,
  userGetTopRatedServices: userGetTopRatedServicesReducer,
  userGetServiceById: userGetServiceByIdReducer,
  userGetServiceCategories: userGetServiceCategoriesReducer,

  //admin && services orders
  adminGetServiceOrders: adminGetServiceOrdersReducer,
  adminGetServiceOrderById: adminGetServiceOrderByIDReducer,
  adminDeleteServiceOrderByIds: adminDeleteServiceOrderByIDReducer,

  // User && Products
  userGetProducts: userGetProductsReducer,
  userGetNewProducts: userGetNewProductsReducer,
  userGetTopRatedProducts: userGetTopRatedProductsReducer,
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
  userSendChatMessage: userSendChatMessageReducer,

  // user && reviews
  userCreateReview: userCreateReviewReducer,
  reviewStat: reviewStatReducer,
  reviewsList: listReviewReducer,

  // USER && NOTIFICATIONS
  createUserNotification: createUserNotificationReducer,
  createSellerNotification: createSellerNotificationReducer,
  getNotifications: getNotificationsReducer,
  get4Notifications: get4NotificationsReducer,
  markNotificationSeen: markNotificationSeenReducer,
  getNotificationUnseenCount: getNotificationUnseenCountReducer,
  deleteNotification: deleteNotificationReducer,

  // seller && revieww
  reviewResponse: sellerRespondReviewReducer,
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
