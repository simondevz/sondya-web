import { createBrowserRouter } from "react-router-dom";
import {
  AboutUs,
  ContactUs,
  ErrorPage,
  Home,
  ProductDetails,
  Products,
  ServiceDetails,
  Services,
} from "./screens";
import Cart from "./screens/Cart";
import WishList from "./screens/WishList";

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
]);

export default App;
