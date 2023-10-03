import { createBrowserRouter } from "react-router-dom";
import {
  AboutUs,
  Cart,
  Checkout,
  ContactUs,
  ErrorPage,
  GiftBoxes,
  Home,
  HotOffers,
  ProductDetails,
  Products,
  Referal,
  ServiceDetails,
  Services,
  WishList,
} from "./screens";
// Auth Import
import {
  AuthError,
  AuthSuccess,
  EmailVerification,
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
} from "./screens/auth";
// dashboard Import
import Acknowledgement from "./screens/Acknowledgement";
import GroupChat from "./screens/GroupChat";
import GroupChatDetails from "./screens/GroupChatDetails";
import GroupChatList from "./screens/GroupChatList";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import TermsAndServices from "./screens/TermsAndServices";
import {
  AdminAccountPayment,
  AdminAddCategory,
  AdminAddProduct,
  AdminAddService,
  AdminCategory,
  AdminDashboard,
  AdminEditCategory,
  AdminEditProduct,
  AdminEditService,
  AdminEditUser,
  AdminOrderDetails,
  AdminOrders,
  AdminProductDetails,
  AdminProducts,
  AdminSalesAnalytics,
  AdminServiceDetails,
  AdminServices,
  AdminTestimonial,
  AdminUpdateTestimonial,
  AdminUserDetails,
  AdminUserManagement,
  AdminWithdrawalOrders,
} from "./screens/admin";
import {
  BrowseHistory,
  Dashboard,
  DashboardSettings,
  Inbox,
  OrderConfirmation,
  OrderDetails,
  OrderHistory,
  Payment,
  TrackDetails,
  TrackOrder,
} from "./screens/dashboard";
import UserTestimony from "./screens/dashboard/UserTestimony";
import {
  SellerBusinessAnalytics,
  SellerDashboard,
  SellerInbox,
  SellerOrder,
  SellerOrderDetails,
  SellerPostProducts,
  SellerProducts,
  SellerSettings,
  SellerWithdrawal,
} from "./screens/seller";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/services",
    element: <Services />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products",
    element: <Products />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/service/details",
    element: <ServiceDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/details",
    element: <ProductDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/groupchats",
    element: <GroupChat />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/groupchat/list",
    element: <GroupChatList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/groupchat/details",
    element: <GroupChatDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/referal",
    element: <Referal />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/giftboxes",
    element: <GiftBoxes />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/hotoffers",
    element: <HotOffers />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/acknowledgement",
    element: <Acknowledgement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms",
    element: <TermsAndServices />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
    errorElement: <ErrorPage />,
  },

  // Authentication
  {
    path: "/auth/error",
    element: <AuthError />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/success",
    element: <AuthSuccess />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/email-verification",
    element: <EmailVerification />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },

  // User DasboardRoutes
  {
    path: "/browse-history",
    element: <BrowseHistory />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard-settings",
    element: <DashboardSettings />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/inbox",
    element: <Inbox />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/order-confirmation",
    element: <OrderConfirmation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/order-history",
    element: <OrderHistory />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/order-details",
    element: <OrderDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/payment",
    element: <Payment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/track-details",
    element: <TrackDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/track-order",
    element: <TrackOrder />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/testimony",
    element: <UserTestimony />,
    errorElement: <ErrorPage />,
  },

  // Seller dashboard routes
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/seller/analytics",
    element: <SellerBusinessAnalytics />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/seller/inbox",
    element: <SellerInbox />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/seller/order",
    element: <SellerOrder />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/seller/order/details",
    element: <SellerOrderDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/seller/products/post",
    element: <SellerPostProducts />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/seller/products",
    element: <SellerProducts />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/seller/settings",
    element: <SellerSettings />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/seller/withdrawal",
    element: <SellerWithdrawal />,
    errorElement: <ErrorPage />,
  },

  // Admin dashboard routes
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/analytics",
    element: <AdminSalesAnalytics />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/category",
    element: <AdminCategory />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/category/add",
    element: <AdminAddCategory />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/category/edit",
    element: <AdminEditCategory />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/products",
    element: <AdminProducts />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/product/add",
    element: <AdminAddProduct />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/product/edit",
    element: <AdminEditProduct />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/product/details",
    element: <AdminProductDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/services",
    element: <AdminServices />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/service/add",
    element: <AdminAddService />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/service/edit",
    element: <AdminEditService />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/service/details",
    element: <AdminServiceDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/users",
    element: <AdminUserManagement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/user/edit",
    element: <AdminEditUser />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/user/details",
    element: <AdminUserDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/orders",
    element: <AdminOrders />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/order/details",
    element: <AdminOrderDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/testimonial",
    element: <AdminTestimonial />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/testimonial/edit",
    element: <AdminUpdateTestimonial />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/payments",
    element: <AdminAccountPayment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/withdrawal/orders",
    element: <AdminWithdrawalOrders />,
    errorElement: <ErrorPage />,
  },
]);

export default App;
