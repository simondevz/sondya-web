import { createBrowserRouter } from "react-router-dom";
import {
  AboutUs,
  Cart,
  Checkout,
  ContactUs,
  ErrorPage,
  Home,
  ProductDetails,
  Products,
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
import {
  BrowseHistory,
  Dashboard,
  DashboardSettings,
  Inbox,
  OrderConfirmation,
  OrderHistory,
  Payment,
  TrackDetails,
  TrackOrder,
} from "./screens/dashboard";

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
    path: "/service-details",
    element: <ServiceDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product-details",
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

  // Authentication
  {
    path: "/auth-error",
    element: <AuthError />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth-success",
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
    path: "/inbox",
    element: <Inbox />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/order-confirmation",
    element: <OrderConfirmation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/order-history",
    element: <OrderHistory />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/payment",
    element: <Payment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/track-details",
    element: <TrackDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/track-order",
    element: <TrackOrder />,
    errorElement: <ErrorPage />,
  },
]);

export default App;
