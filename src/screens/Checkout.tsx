import { CheckoutBody } from "../components/checkout";
import { Footer, Nav } from "../components/layout";

const Checkout = () => {
  return (
    <div className="overflow-x-scroll">
      <Nav isHome />
      <CheckoutBody />
      <Footer />
    </div>
  );
};

export default Checkout;
