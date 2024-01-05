import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  adminDashboardCheck,
  authCheck,
  dashboardCheck,
  homeCheck,
  sellerDashboardCheck,
} from "./utils/checkAuth.utils";

const Home = lazy(() => import("./screens/Home"));
const AboutUs = lazy(() => import("./screens/AboutUs"));
const Cart = lazy(() => import("./screens/Cart"));
const Checkout = lazy(() => import("./screens/Checkout"));
const ContactUs = lazy(() => import("./screens/ContactUs"));
const ErrorPage = lazy(() => import("./screens/ErrorPage"));

const ProductDetails = lazy(() => import("./screens/ProductsDetails"));
const Products = lazy(() => import("./screens/Products"));
const Referal = lazy(() => import("./screens/Referal"));
const ServiceDetails = lazy(() => import("./screens/ServicesDetails"));
const Services = lazy(() => import("./screens/Services"));
const WishList = lazy(() => import("./screens/dashboard/WishList"));
const GroupChatList = lazy(() => import("./screens/GroupChatList"));

const AdminAccountPayment = lazy(
  () => import("./screens/admin/AdminAccountPayment")
);
const AdminAddCategory = lazy(() => import("./screens/admin/AdminAddCategory"));
const AdminAddProduct = lazy(() => import("./screens/admin/AdminAddProduct"));
const AdminAddService = lazy(() => import("./screens/admin/AdminAddService"));
const AdminCategory = lazy(() => import("./screens/admin/AdminCategory"));
const AdminSubscribers = lazy(() => import("./screens/admin/AdminSubscribers"));
const AdminCreateGroupChat = lazy(
  () => import("./screens/admin/AdminCreateGroupChat")
);
const AdminDashboard = lazy(() => import("./screens/admin/AdminDashboard"));
const AdminEditCategory = lazy(
  () => import("./screens/admin/AdminEditCategory")
);
const AdminEditProduct = lazy(() => import("./screens/admin/AdminEditProduct"));
const AdminEditService = lazy(() => import("./screens/admin/AdminEditService"));
const AdminEditUser = lazy(() => import("./screens/admin/AdminEditUser"));
const AdminGroupChatList = lazy(
  () => import("./screens/admin/AdminGroupChatList")
);
const AdminOrderDetails = lazy(
  () => import("./screens/admin/AdminOrderDetails")
);
const AdminOrders = lazy(() => import("./screens/admin/AdminOrders"));
const AdminPaymentDetails = lazy(
  () => import("./screens/admin/AdminPaymentDetails")
);
const AdminPayments = lazy(() => import("./screens/admin/AdminPayments"));
const AdminProductDetails = lazy(
  () => import("./screens/admin/AdminProductDetails")
);
const AdminProducts = lazy(() => import("./screens/admin/AdminProducts"));
const AdminSalesAnalytics = lazy(
  () => import("./screens/admin/AdminSalesAnalytics")
);
const AdminServiceDetails = lazy(
  () => import("./screens/admin/AdminServiceDetails")
);
const AdminServices = lazy(() => import("./screens/admin/AdminServices"));
const AdminTestimonial = lazy(() => import("./screens/admin/AdminTestimonial"));
const AdminUpdateTestimonial = lazy(
  () => import("./screens/admin/AdminUpdateTestimonial")
);
const AdminUserDetails = lazy(() => import("./screens/admin/AdminUserDetails"));
const AdminUserManagement = lazy(
  () => import("./screens/admin/AdminUserManagement")
);
const AdminWithdrawalDetails = lazy(
  () => import("./screens/admin/AdminWithdrawalDetails")
);
const AdminWithdrawalOrders = lazy(
  () => import("./screens/admin/AdminWithdrawalOrders")
);

// Auth Import
const AuthError = lazy(() => import("./screens/auth/AuthError"));
const AuthSuccess = lazy(() => import("./screens/auth/AuthSuccess"));
const ForgotPassword = lazy(() => import("./screens/auth/ForgotPassword"));
const SellerProductsPostingRules = lazy(
  () => import("./screens/seller/SellerProductsPostingRules")
);
const SellerServicePostingRules = lazy(
  () => import("./screens/seller/SellerServicePostingRules")
);
const ResetPassword = lazy(() => import("./screens/auth/ResetPassword"));
const SignIn = lazy(() => import("./screens/auth/SignIn"));
const SignUp = lazy(() => import("./screens/auth/SignUp"));
const EmailVerification = lazy(
  () => import("./screens/auth/EmailVerification")
);

const Dashboard = lazy(() => import("./screens/dashboard/Dashboard"));
const DashboardSettings = lazy(
  () => import("./screens/dashboard/DashboardSettings")
);
const Inbox = lazy(() => import("./screens/dashboard/Inbox"));
const OrderConfirmation = lazy(
  () => import("./screens/dashboard/OrderConfirmation")
);
const OrderDetails = lazy(() => import("./screens/dashboard/OrderDetails"));
const OrderHistory = lazy(() => import("./screens/dashboard/OrderHistory"));
const Payment = lazy(() => import("./screens/dashboard/Payment"));
const PaymentDetails = lazy(() => import("./screens/dashboard/PaymentDetails"));
const ServiceOrderDetails = lazy(
  () => import("./screens/dashboard/ServiceOrderDetails")
);
const TrackDetails = lazy(() => import("./screens/dashboard/TrackDetails"));
const TrackOrder = lazy(() => import("./screens/dashboard/TrackOrder"));

const SellerBusinessAnalytics = lazy(
  () => import("./screens/seller/SellerBusinessAnalytics")
);
const SellerDashboard = lazy(() => import("./screens/seller/SellerDashboard"));
const SellerEditService = lazy(
  () => import("./screens/seller/SellerEditService")
);
const SellerInbox = lazy(() => import("./screens/seller/SellerInbox"));
const SellerOrder = lazy(() => import("./screens/seller/SellerOrder"));
const SellerOrderDetails = lazy(
  () => import("./screens/seller/SellerOrderDetails")
);
const SellerPostProducts = lazy(
  () => import("./screens/seller/SellerPostProducts")
);
const SellerPostService = lazy(
  () => import("./screens/seller/SellerPostService")
);
const SellerProducts = lazy(() => import("./screens/seller/SellerProducts"));
const SellerServiceDetails = lazy(
  () => import("./screens/seller/SellerServiceDetails")
);
const SellerServiceOrderDetails = lazy(
  () => import("./screens/seller/SellerServiceOrderDetails")
);
const SellerServices = lazy(() => import("./screens/seller/SellerServices"));
const SellerSettings = lazy(() => import("./screens/seller/SellerSettings"));
const SellerWithdrawal = lazy(
  () => import("./screens/seller/SellerWithdrawal")
);
const SellerWithdrawalDetails = lazy(
  () => import("./screens/seller/SellerWithdrawalDetails")
);

const Acknowledgement = lazy(() => import("./screens/Acknowledgement"));
const GroupChat = lazy(() => import("./screens/GroupChat"));
const GroupChatDetails = lazy(() => import("./screens/GroupChatDetails"));
const PrivacyPolicy = lazy(() => import("./screens/PrivacyPolicy"));
const ServiceCheckout = lazy(() => import("./screens/ServiceCheckout"));
const TermsAndServices = lazy(() => import("./screens/TermsAndServices"));
const AdminInbox = lazy(() => import("./screens/admin/AdminInbox"));
const Notifications = lazy(() => import("./screens/dashboard/Notifications"));
const UserTestimony = lazy(() => import("./screens/dashboard/UserTestimony"));
const ServiceOrderHistory = lazy(
  () => import("./screens/dashboard/ServiceOrderHistory")
);
const SellerEditProducts = lazy(
  () => import("./screens/seller/SellerEditProducts")
);
const SellerProductDetails = lazy(
  () => import("./screens/seller/SellerProductDetails")
);
const SellerServiceOrder = lazy(
  () => import("./screens/seller/SellerServiceOrder")
);

const App = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/services",
    element: <Services />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/products",
    element: <Products />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/service/details/:id/:name",
    element: <ServiceDetails />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/product/details/:id/:name",
    element: <ProductDetails />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/wishlist",
    element: <WishList />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/checkout",
    element: <Checkout />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/groupchats",
    element: <GroupChat />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/groupchat/list",
    element: <GroupChatList />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/groupchat/details",
    element: <GroupChatDetails />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/referal",
    element: <Referal />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },

  {
    path: "/acknowledgement",
    element: <Acknowledgement />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/terms",
    element: <TermsAndServices />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/service/checkout/:order_id",
    element: <ServiceCheckout />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  // Authentication
  {
    path: "/auth/error",
    element: <AuthError />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/auth/success",
    element: <AuthSuccess />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/email-verification/:email",
    element: <EmailVerification />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/reset-password/:email",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/login",
    element: <SignIn />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/register",
    element: <SignUp />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },

  // User DasboardRoutes
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/dashboard/settings",
    element: <DashboardSettings />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/inbox",
    element: <Inbox />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/order/confirmation",
    element: <OrderConfirmation />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/order/history",
    element: <OrderHistory />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/service/order/history",
    element: <ServiceOrderHistory />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/order/details/:id",
    element: <OrderDetails />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/order/service/details/:order_id",
    element: <ServiceOrderDetails />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/payment",
    element: <Payment />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/payment/details/:id",
    element: <PaymentDetails />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/track/details/:order_id",
    element: <TrackDetails />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/track-order",
    element: <TrackOrder />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/testimony",
    element: <UserTestimony />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/notifications",
    element: <Notifications />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },

  // Seller dashboard routes
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/analytics",
    element: <SellerBusinessAnalytics />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/inbox",
    element: <SellerInbox />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/orders/products",
    element: <SellerOrder />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/orders/services",
    element: <SellerServiceOrder />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/order/details/:id",
    element: <SellerOrderDetails />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/service/order/details/:order_id",
    element: <SellerServiceOrderDetails />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/products/post",
    element: <SellerPostProducts />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/products/posting-rules",
    element: <SellerProductsPostingRules />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/products/edit/:id",
    element: <SellerEditProducts />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/products/details/:id",
    element: <SellerProductDetails />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/products",
    element: <SellerProducts />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/settings",
    element: <SellerSettings />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/withdrawal",
    element: <SellerWithdrawal />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/withdrawal/details/:id",
    element: <SellerWithdrawalDetails />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/services",
    element: <SellerServices />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/service/post",
    element: <SellerPostService />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/service/posting-rules",
    element: <SellerServicePostingRules />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/service/edit/:id",
    element: <SellerEditService />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/service/details/:id",
    element: <SellerServiceDetails />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },

  // Admin dashboard routes
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/analytics",
    element: <AdminSalesAnalytics />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/category",
    element: <AdminCategory />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/category/add",
    element: <AdminAddCategory />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/payments",
    element: <AdminPayments />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/payment/details/:id",
    element: <AdminPaymentDetails />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/category/edit/:id",
    element: <AdminEditCategory />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/groupchat/list",
    element: <AdminGroupChatList />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/groupchat/create",
    element: <AdminCreateGroupChat />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/groupchat/details",
    element: <AdminCreateGroupChat />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/inbox",
    element: <AdminInbox />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/products",
    element: <AdminProducts />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/product/add",
    element: <AdminAddProduct />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/product/edit/:id",
    element: <AdminEditProduct />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/product/details/:id",
    element: <AdminProductDetails />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/services",
    element: <AdminServices />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/service/add",
    element: <AdminAddService />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/service/edit/:id",
    element: <AdminEditService />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/service/details/:id",
    element: <AdminServiceDetails />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/subscribers",
    element: <AdminSubscribers />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/users",
    element: <AdminUserManagement />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/user/edit/:id",
    element: <AdminEditUser />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/user/details/:id",
    element: <AdminUserDetails />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/orders",
    element: <AdminOrders />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/order/details/:id",
    element: <AdminOrderDetails />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/testimonial",
    element: <AdminTestimonial />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/testimonial/edit",
    element: <AdminUpdateTestimonial />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/withdrawals",
    element: <AdminAccountPayment />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/withdrawals/details/:id",
    element: <AdminWithdrawalDetails />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/withdrawal/history",
    element: <AdminWithdrawalOrders />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
]);

export default App;
